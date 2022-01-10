<?php

namespace BetterLinks;

use Elementor\Controls_Manager;
use Elementor\Plugin;

class Elementor {
	use \BetterLinks\Traits\Links;
	use \BetterLinks\Traits\Terms;
	use \BetterLinks\Traits\ArgumentSchema;

	public function __construct() {
		add_action( 'elementor/element/before_section_end', [ $this, 'add_controller' ], 10, 3 );
		add_action( 'elementor/editor/after_save', [ $this, 'handle_instant_redirect_data' ], 10, 2 );
		add_action( 'betterlinks/pre_before_redirect', [ $this, 'disable_elementor_preview_redirect' ] );
	}

	public function bl_get_link_options( $option_name = null ) {
		$links_option = json_decode( get_option( BETTERLINKS_LINKS_OPTION_NAME ), true );

		if ( $option_name ) {
			if ( isset( $links_option[ $option_name ] ) ) {
				return $links_option[ $option_name ];
			}

			return '';
		}

		return $links_option;
	}

	public function bl_get_category_options( $first_index = false ) {
		$terms   = $this->get_all_terms_data( null );
		$options = [];
		$index   = 0;
		foreach ( (array) $terms as $term ) {
			if ( $first_index && $index === 0 ) {
				return $term['ID'];
			}
			$options[ $term['ID'] ] = $term['term_name'];
			$index ++;
		}

		return $options;
	}

	public function gen_short_link_from_permalink( $page_id ) {
		$permalink = get_permalink( $page_id );
		$permalink = str_replace( site_url( '/' ), '', $permalink );

		if ( $permalink[ - 1 ] === '/' ) {
			$permalink = substr_replace( $permalink, '', - 1 );
		}

		return $permalink;
	}

	public function gen_slug_from_title( $title ) {
		$string = strtolower( $title );
		$string = preg_replace( '/-+/', '', $string );
		$string = preg_replace( '/\s+/', '-', $string );
		$string = preg_replace( '/[^a-z0-9-]/', '', $string );

		return $string;
	}

	public function disable_elementor_preview_redirect( $data ) {
		if ( isset( $_GET['elementor-preview'] ) ) {
			return false;
		}

		return $data;
	}

	public function add_controller( $document, $section_id, $args ) {
		if ( $section_id === 'document_settings' && $args['tab'] === 'settings' ) {
			$this->instant_redirect_controls( $document );
		}
	}

	public function instant_redirect_controls( $controls ) {
		$controls->add_control(
			'bl_instant_redirect_heading',
			[
				'type'      => Controls_Manager::HEADING,
				'label'     => __( 'BetterLinks Instant Redirect', 'betterlinks' ),
				'separator' => 'before',
			]
		);

		$controls->add_control(
			'bl_ir_active',
			[
				'label'        => esc_html__( 'Active Instant Redirect', 'betterlinks' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'betterlinks' ),
				'label_off'    => esc_html__( 'Off', 'betterlinks' ),
				'return_value' => 'yes',
				'default'      => '',
			]
		);

		$controls->add_control(
			'bl_ir_target_url',
			[
				'type'      => Controls_Manager::TEXT,
				'label'     => __( 'Target URL', 'betterlinks' ),
				'condition' => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_redirect_type',
			[
				'type'      => Controls_Manager::SELECT,
				'label'     => __( 'Redirect Type', 'betterlinks' ),
				'default'   => $this->bl_get_link_options( 'redirect_type' ),
				'options'   => [
					'307' => esc_html__( '307 (Temporary)', 'betterlinks' ),
					'302' => esc_html__( '302 (Temporary)', 'betterlinks' ),
					'301' => esc_html__( '301 (Temporary)', 'betterlinks' ),
				],
				'condition' => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_category',
			[
				'type'      => Controls_Manager::SELECT,
				'label'     => __( 'Choose Category', 'betterlinks' ),
				'default'   => $this->bl_get_category_options( true ),
				'options'   => $this->bl_get_category_options(),
				'condition' => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_options_heading',
			[
				'type'      => Controls_Manager::HEADING,
				'label'     => __( 'Link Options', 'betterlinks' ),
				'condition' => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_options_nofollow',
			[
				'label'        => esc_html__( 'No Follow', 'betterlinks' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'betterlinks' ),
				'label_off'    => esc_html__( 'Off', 'betterlinks' ),
				'return_value' => 'yes',
				'default'      => $this->bl_get_link_options( 'nofollow' ) == true ? 'yes' : '',
				'condition'    => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_options_sponsored',
			[
				'label'        => esc_html__( 'Sponsored', 'betterlinks' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'betterlinks' ),
				'label_off'    => esc_html__( 'Off', 'betterlinks' ),
				'return_value' => 'yes',
				'default'      => $this->bl_get_link_options( 'sponsored' ) == true ? 'yes' : '',
				'condition'    => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_options_parameter_forwarding',
			[
				'label'        => esc_html__( 'Parameter Forwarding', 'betterlinks' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'betterlinks' ),
				'label_off'    => esc_html__( 'Off', 'betterlinks' ),
				'return_value' => 'yes',
				'default'      => $this->bl_get_link_options( 'param_forwarding' ) == true ? 'yes' : '',
				'condition'    => [
					'bl_ir_active' => 'yes'
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_options_tracking',
			[
				'label'        => esc_html__( 'Tracking', 'betterlinks' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'betterlinks' ),
				'label_off'    => esc_html__( 'Off', 'betterlinks' ),
				'return_value' => 'yes',
				'default'      => $this->bl_get_link_options( 'track_me' ) == true ? 'yes' : '',
				'condition'    => [
					'bl_ir_active' => 'yes'
				],
			]
		);
	}

	public function handle_instant_redirect_data( $post_id, $editor_data ) {
		$document              = Plugin::$instance->documents->get( $post_id, false );
		$current_time          = current_time( 'U' );
		$current_gmt_time      = current_time( 'U', true );
		$title                 = $document->get_settings( 'post_title' );
		$shortLink             = $this->gen_short_link_from_permalink( $post_id );
		$link                  = \BetterLinks\Traits\Query::get_link_by_short_url( $shortLink );
		$link_id               = isset( $link[0]['ID'] ) ? $link[0]['ID'] : 'undefined';
		$is_active             = $document->get_settings( 'bl_ir_active' );
		$instant_redirect_data = [
			'ID'                => $link_id,
			'target_url'        => $document->get_settings( 'bl_ir_target_url' ),
			'cat_id'            => $document->get_settings( 'bl_ir_link_category' ),
			'redirect_type'     => $document->get_settings( 'bl_ir_redirect_type' ),
			'nofollow'          => $document->get_settings( 'bl_ir_link_options_nofollow' ) === 'yes' ? 1 : '',
			'param_forwarding'  => $document->get_settings( 'bl_ir_link_options_parameter_forwarding' ) === 'yes' ? 1 : '',
			'sponsored'         => $document->get_settings( 'bl_ir_link_options_sponsored' ) === 'yes' ? 1 : '',
			'track_me'          => $document->get_settings( 'bl_ir_link_options_tracking' ) === 'yes' ? 1 : '',
			'link_slug'         => $this->gen_slug_from_title( $title ),
			'link_title'        => $title,
			'short_url'         => $shortLink,
			'link_date'         => date( 'Y-m-d H:i:s', $current_time ),
			'link_date_gmt'     => date( 'Y-m-d H:i:s', $current_gmt_time ),
			'link_modified'     => date( 'Y-m-d H:i:s', $current_time ),
			'link_modified_gmt' => date( 'Y-m-d H:i:s', $current_gmt_time ),
		];

		delete_transient( BETTERLINKS_CACHE_LINKS_NAME );

		if ( $link_id === 'undefined' && $is_active === 'yes' ) {
			$args = $this->sanitize_links_data( $instant_redirect_data );
			$this->insert_link( $args );
		} elseif ( $link_id !== 'undefined' && $is_active === 'yes' ) {
			$args = $this->sanitize_links_data( $instant_redirect_data );
			unset( $args['link_date'], $args['link_date_gmt'] );
			$this->update_link( $args );
		} elseif ( $link_id !== 'undefined' && $is_active !== 'yes' ) {
			$args = [
				'ID'        => sanitize_text_field( $link_id ),
				'short_url' => sanitize_text_field( $shortLink ),
			];
			$this->delete_link( $args );
			\BetterLinks\Helper::delete_link_meta( $args['ID'], 'keywords' );
		}
	}
}
