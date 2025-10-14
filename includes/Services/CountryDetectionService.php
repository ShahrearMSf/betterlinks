<?php
namespace BetterLinks\Services;

use BetterLinks\Helper;

/**
 * Country Detection Service
 * 
 * Handles IP-to-country detection with caching and efficient database storage
 */
class CountryDetectionService {

    /**
     * Cache duration for IP-to-country mapping (24 hours)
     */
    const CACHE_DURATION = DAY_IN_SECONDS;

    /**
     * Multiple API endpoints for fallback support
     * Tries APIs in order until one succeeds
     */
    const API_ENDPOINTS = array(
        array(
            'url' => 'http://ip-api.com/json/{IP}',
            'limit' => '45 requests per minute',
            'country_field' => 'country',
            'country_code_field' => 'countryCode'
        ),
        array(
            'url' => 'https://api.db-ip.com/v2/free/{IP}',
            'limit' => '500 requests per day',
            'country_field' => 'countryName',
            'country_code_field' => 'countryCode'
        ),
        array(
            'url' => 'https://free.freeipapi.com/api/json/{IP}',
            'limit' => '60 requests per minute',
            'country_field' => 'countryName',
            'country_code_field' => 'countryCode'
        ),
        array(
            'url' => 'https://api.ipinfo.io/lite/{IP}?token=42ae8aabca02ac',
            'limit' => 'depends on token plan',
            'country_field' => 'country',
            'country_code_field' => 'country_code'
        )
    );

    /**
     * Get country information for an IP address
     * 
     * @param string $ip The IP address to lookup
     * @return array|null Array with country_code and country_name, or null if not found
     */
    public static function get_country_by_ip( $ip ) {
        if ( empty( $ip ) || ! filter_var( $ip, FILTER_VALIDATE_IP ) ) {
            return null;
        }

        // Check cache first
        $cached_country = self::get_cached_country( $ip );
        if ( $cached_country !== null ) {
            return $cached_country;
        }

        // Check if we already have this country in our database
        $country_data = self::fetch_country_from_api( $ip );
        if ( $country_data ) {
            // Cache the result
            self::cache_country( $ip, $country_data );

            // Store in countries lookup table if not exists
            self::store_country_in_lookup_table( $country_data );

            // Return only the essential fields (remove api_used for external use)
            return array(
                'country_code' => $country_data['country_code'],
                'country_name' => $country_data['country_name'],
            );
        }

        return null;
    }

    /**
     * Get cached country data for an IP
     * 
     * @param string $ip The IP address
     * @return array|null Cached country data or null
     */
    private static function get_cached_country( $ip ) {
        $cache_key = 'btl_country_' . md5( $ip );
        $cached = get_transient( $cache_key );
        
        if ( $cached && is_array( $cached ) ) {
            return $cached;
        }
        
        return null;
    }

    /**
     * Cache country data for an IP
     * 
     * @param string $ip The IP address
     * @param array $country_data Country information
     */
    private static function cache_country( $ip, $country_data ) {
        $cache_key = 'btl_country_' . md5( $ip );
        set_transient( $cache_key, $country_data, self::CACHE_DURATION );
    }

    /**
     * Fetch country data from multiple APIs with fallback support
     * Tries each API in sequence until one succeeds
     *
     * @param string $ip The IP address
     * @return array|null Country data from API or null
     */
    private static function fetch_country_from_api( $ip ) {
        foreach ( self::API_ENDPOINTS as $api_config ) {
            $country_data = self::try_single_api( $ip, $api_config );
            if ( $country_data ) {
                return $country_data;
            }
        }

        // If all APIs failed, return null
        return null;
    }

    /**
     * Try a single API endpoint
     *
     * @param string $ip The IP address
     * @param array $api_config API configuration
     * @return array|null Country data or null if failed
     */
    private static function try_single_api( $ip, $api_config ) {
        // Check if this API has been rate limited recently
        $rate_limit_key = 'btl_api_rate_limit_' . md5( $api_config['url'] );
        if ( get_transient( $rate_limit_key ) ) {
            return null; // Skip this API if it's rate limited
        }

        $api_url = str_replace( '{IP}', $ip, $api_config['url'] );

        $response = wp_remote_get( $api_url, array(
            'timeout' => 10,
            'headers' => array(
                'User-Agent' => 'BetterLinks/' . BETTERLINKS_VERSION
            )
        ) );

        if ( is_wp_error( $response ) ) {
            return null;
        }

        $response_code = wp_remote_retrieve_response_code( $response );

        // Handle rate limiting
        if ( $response_code === 429 ) {
            // Rate limited - cache this for 5 minutes
            set_transient( $rate_limit_key, true, 5 * MINUTE_IN_SECONDS );
            return null;
        }

        if ( $response_code !== 200 ) {
            return null;
        }

        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( ! $data ) {
            return null;
        }

        // Handle API-specific error responses
        if ( isset( $data['status'] ) && $data['status'] === 'fail' ) {
            // ip-api.com error response
            return null;
        }

        // Extract country data based on API-specific field names
        $country_field = $api_config['country_field'];
        $country_code_field = $api_config['country_code_field'];

        if ( ! isset( $data[$country_field] ) || ! isset( $data[$country_code_field] ) ) {
            return null;
        }

        // Normalize field names to our standard format
        $result = array(
            'country_code' => sanitize_text_field( $data[$country_code_field] ),
            'country_name' => sanitize_text_field( $data[$country_field] ),
            'api_used' => $api_config['url'] // Track which API was successful
        );

        return $result;
    }

    /**
     * Store country in the lookup table if it doesn't exist
     * 
     * @param array $country_data Country information
     * @return int|false Country ID or false on failure
     */
    private static function store_country_in_lookup_table( $country_data ) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'betterlinks_countries';
        
        // Check if country already exists
        $existing = $wpdb->get_var( $wpdb->prepare(
            "SELECT id FROM {$table_name} WHERE country_code = %s",
            $country_data['country_code']
        ) );
        
        if ( $existing ) {
            return $existing;
        }
        
        // Insert new country (ignore api_used field if present)
        $result = $wpdb->insert(
            $table_name,
            array(
                'country_code' => $country_data['country_code'],
                'country_name' => $country_data['country_name'],
            ),
            array( '%s', '%s' )
        );
        
        if ( $result === false ) {
            error_log( 'BetterLinks: Failed to insert country into lookup table: ' . $wpdb->last_error );
            return false;
        }
        
        return $wpdb->insert_id;
    }

    /**
     * Get country data from lookup table by country code
     * 
     * @param string $country_code The country code
     * @return array|null Country data or null
     */
    public static function get_country_from_lookup_table( $country_code ) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'betterlinks_countries';
        
        $country = $wpdb->get_row( $wpdb->prepare(
            "SELECT * FROM {$table_name} WHERE country_code = %s",
            $country_code
        ), ARRAY_A );
        
        return $country ? $country : null;
    }

    /**
     * Get all countries from lookup table
     * 
     * @return array Array of all countries
     */
    public static function get_all_countries() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'betterlinks_countries';
        
        $countries = $wpdb->get_results(
            "SELECT * FROM {$table_name} ORDER BY country_name ASC",
            ARRAY_A
        );
        
        return $countries ? $countries : array();
    }

    /**
     * Clear country cache for an IP
     * 
     * @param string $ip The IP address
     */
    public static function clear_country_cache( $ip ) {
        $cache_key = 'btl_country_' . md5( $ip );
        delete_transient( $cache_key );
    }



    /**
     * Get country statistics for analytics
     *
     * @param string $from Start date
     * @param string $to End date
     * @param int|null $link_id Optional link ID to filter by
     * @return array Country statistics
     */
    public static function get_country_statistics( $from, $to, $link_id = null ) {
        global $wpdb;

        $cache_key = 'btl_country_stats_' . md5( $from . $to . $link_id );
        $cached = get_transient( $cache_key );

        if ( $cached && is_array( $cached ) ) {
            return $cached;
        }

        $where_clause = "WHERE created_at BETWEEN %s AND %s AND country_code IS NOT NULL AND country_code != ''";
        $params = array( $from . ' 00:00:00', $to . ' 23:59:59' );

        if ( $link_id ) {
            $where_clause .= " AND link_id = %d";
            $params[] = $link_id;
        }

        $query = $wpdb->prepare(
            "SELECT country_code, country_name, COUNT(*) as clicks, COUNT(DISTINCT ip) as unique_clicks
             FROM {$wpdb->prefix}betterlinks_clicks
             {$where_clause}
             GROUP BY country_code, country_name
             ORDER BY clicks DESC
             LIMIT 10",
            $params
        );

        $results = $wpdb->get_results( $query, ARRAY_A );

        set_transient( $cache_key, $results, self::CACHE_DURATION );
        return $results ? $results : array();
    }

    /**
     * Get current client IP address
     *
     * @return string|null The client IP address or null
     */
    public static function get_current_client_ip() {
        $ip_keys = array(
            'HTTP_CF_CONNECTING_IP',
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR'
        );

        foreach ( $ip_keys as $key ) {
            if ( array_key_exists( $key, $_SERVER ) === true ) {
                $ip = sanitize_text_field( $_SERVER[ $key ] );

                if ( strpos( $ip, ',' ) !== false ) {
                    $ip = explode( ',', $ip )[0];
                }

                $ip = trim( $ip );

                if ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE ) ) {
                    return $ip;
                }
            }
        }

        return null;
    }

    /**
     * Backfill country data for existing clicks without country information
     *
     * @param int $limit Number of records to process per batch
     * @return array Processing results
     */
    public static function backfill_country_data( $limit = 100 ) {
        global $wpdb;

        // Get clicks without country data
        $clicks = $wpdb->get_results( $wpdb->prepare(
            "SELECT ID, ip FROM {$wpdb->prefix}betterlinks_clicks
             WHERE ip IS NOT NULL AND ip != ''
             AND (country_code IS NULL OR country_code = '')
             LIMIT %d",
            $limit
        ), ARRAY_A );

        $processed = 0;
        $updated = 0;
        $errors = 0;

        foreach ( $clicks as $click ) {
            $processed++;

            $country_data = self::get_country_by_ip( $click['ip'] );

            if ( $country_data ) {
                $result = $wpdb->update(
                    $wpdb->prefix . 'betterlinks_clicks',
                    array(
                        'country_code' => $country_data['country_code'],
                        'country_name' => $country_data['country_name']
                    ),
                    array( 'ID' => $click['ID'] ),
                    array( '%s', '%s' ),
                    array( '%d' )
                );

                if ( $result !== false ) {
                    $updated++;
                } else {
                    $errors++;
                }
            } else {
                $errors++;
            }

            // Add a small delay to avoid overwhelming the API
            usleep( 100000 ); // 0.1 second delay
        }

        return array(
            'processed' => $processed,
            'updated' => $updated,
            'errors' => $errors,
            'remaining' => self::get_clicks_without_country_count()
        );
    }

    /**
     * Get count of clicks without country data
     *
     * @return int Number of clicks without country data
     */
    public static function get_clicks_without_country_count() {
        global $wpdb;

        return (int) $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->prefix}betterlinks_clicks
             WHERE ip IS NOT NULL AND ip != ''
             AND (country_code IS NULL OR country_code = '')"
        );
    }

    /**
     * Get API usage statistics from cache
     *
     * @return array API usage statistics
     */
    public static function get_api_usage_stats() {
        $stats = array();

        foreach ( self::API_ENDPOINTS as $index => $api_config ) {
            $rate_limit_key = 'btl_api_rate_limit_' . md5( $api_config['url'] );
            $is_rate_limited = get_transient( $rate_limit_key );

            $stats[] = array(
                'api_index' => $index + 1,
                'url' => $api_config['url'],
                'limit' => $api_config['limit'],
                'is_rate_limited' => (bool) $is_rate_limited,
                'rate_limit_expires' => $is_rate_limited ? get_option( '_transient_timeout_' . $rate_limit_key ) : null
            );
        }

        return $stats;
    }
}
