/**
 * Frontend Geolocation Service
 * 
 * Handles IP-to-country detection from the frontend using multiple free APIs
 * with fallback to backend if frontend detection fails.
 * 
 * This approach distributes API requests across users' browsers instead of
 * concentrating them on the server, avoiding rate limiting issues.
 */

class GeolocationService {
	constructor() {
		this.cache = new Map();
		this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
		this.requestTimeout = 5000; // 5 seconds timeout per API
		
		// Frontend APIs - tried in order
		this.frontendApis = [
			{
				name: 'ip-api',
				url: 'http://ip-api.com/json/',
				countryField: 'country',
				countryCodeField: 'countryCode',
				timeout: 5000,
				rateLimit: '45 requests per minute'
			},
			{
				name: 'db-ip',
				url: 'https://api.db-ip.com/v2/free/',
				countryField: 'countryName',
				countryCodeField: 'countryCode',
				timeout: 5000,
				rateLimit: '500 requests per day'
			},
			{
				name: 'freeipapi',
				url: 'https://free.freeipapi.com/api/json/',
				countryField: 'countryName',
				countryCodeField: 'countryCode',
				timeout: 5000,
				rateLimit: '60 requests per minute'
			}
		];
	}

	/**
	 * Get country data for current user's IP
	 * Tries frontend APIs first, falls back to backend if needed
	 * 
	 * @returns {Promise<Object|null>} Country data {country_code, country_name} or null
	 */
	async getCountry() {
		try {
			// Try frontend detection first
			const countryData = await this.detectFromFrontend();
			
			if (countryData) {
				return countryData;
			}
			
			// Fallback to backend if frontend detection fails
			console.warn('Frontend geolocation failed, using backend fallback');
			return await this.detectFromBackend();
		} catch (error) {
			console.error('Geolocation error:', error);
			return null;
		}
	}

	/**
	 * Detect country from frontend APIs
	 * 
	 * @returns {Promise<Object|null>}
	 */
	async detectFromFrontend() {
		for (const api of this.frontendApis) {
			try {
				const countryData = await this.tryApi(api);
				if (countryData) {
					// Cache the result
					this.setCacheData(countryData);
					return countryData;
				}
			} catch (error) {
				console.warn(`${api.name} API failed:`, error.message);
				continue;
			}
		}
		
		return null;
	}

	/**
	 * Try a single API endpoint
	 * 
	 * @param {Object} api API configuration
	 * @returns {Promise<Object|null>}
	 */
	async tryApi(api) {
		return new Promise((resolve, reject) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), api.timeout);

			fetch(api.url, {
				signal: controller.signal,
				headers: {
					'User-Agent': 'BetterLinks-Frontend/1.0'
				}
			})
			.then(response => {
				clearTimeout(timeoutId);
				
				if (!response.ok) {
					reject(new Error(`HTTP ${response.status}`));
				}
				return response.json();
			})
			.then(data => {
				// Extract country data based on API-specific field names
				const countryCode = data[api.countryCodeField];
				const countryName = data[api.countryField];

				if (countryCode && countryName) {
					resolve({
						country_code: countryCode,
						country_name: countryName,
						api_used: api.name
					});
				} else {
					reject(new Error('Missing country fields in response'));
				}
			})
			.catch(error => {
				clearTimeout(timeoutId);
				reject(error);
			});
		});
	}

	/**
	 * Fallback to backend detection
	 * 
	 * @returns {Promise<Object|null>}
	 */
	async detectFromBackend() {
		try {
			const response = await fetch(
				`${betterLinksApp.rest_url}betterlinks/v1/geolocation/detect`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': betterLinksApp.nonce
					}
				}
			);

			if (!response.ok) {
				throw new Error(`Backend API returned ${response.status}`);
			}

			const result = await response.json();
			
			if (result.success && result.data) {
				// Cache the result
				this.setCacheData(result.data);
				return result.data;
			}

			return null;
		} catch (error) {
			console.error('Backend geolocation failed:', error);
			return null;
		}
	}

	/**
	 * Set cache data in localStorage
	 * 
	 * @param {Object} countryData
	 */
	setCacheData(countryData) {
		try {
			const cacheEntry = {
				data: countryData,
				timestamp: Date.now()
			};
			localStorage.setItem('btl_geolocation_cache', JSON.stringify(cacheEntry));
		} catch (error) {
			console.warn('Failed to cache geolocation data:', error);
		}
	}

	/**
	 * Get cached country data if still valid
	 * 
	 * @returns {Object|null}
	 */
	getCachedData() {
		try {
			const cached = localStorage.getItem('btl_geolocation_cache');
			if (!cached) return null;

			const cacheEntry = JSON.parse(cached);
			const age = Date.now() - cacheEntry.timestamp;

			if (age < this.cacheExpiry) {
				return cacheEntry.data;
			}

			// Cache expired, remove it
			localStorage.removeItem('btl_geolocation_cache');
			return null;
		} catch (error) {
			console.warn('Failed to retrieve cached geolocation data:', error);
			return null;
		}
	}

	/**
	 * Clear cached geolocation data
	 */
	clearCache() {
		try {
			localStorage.removeItem('btl_geolocation_cache');
		} catch (error) {
			console.warn('Failed to clear geolocation cache:', error);
		}
	}
}

// Export as singleton
const geolocationService = new GeolocationService();

