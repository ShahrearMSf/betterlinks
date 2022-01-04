<?php
namespace BetterLinks;

use Elementor\Controls_Manager;

class Elementor {
	public function __construct() {
		add_action( 'elementor/element/before_section_end', [ $this, 'add_controller' ], 10, 3 );
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
			'bl_ir_target_url',
			[
				'type'  => Controls_Manager::TEXT,
				'label' => __( 'Target URL', 'betterlinks' ),
			]
		);

		$controls->add_control(
			'bl_ir_redirect_type',
			[
				'type'    => Controls_Manager::SELECT,
				'label'   => __( 'Redirect Type', 'betterlinks' ),
				'default' => $this->bl_get_link_options( 'redirect_type' ),
				'options' => [
					'307' => esc_html__( '307 (Temporary)', 'betterlinks' ),
					'302' => esc_html__( '302 (Temporary)', 'betterlinks' ),
					'301' => esc_html__( '301 (Temporary)', 'betterlinks' ),
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_category',
			[
				'type'    => Controls_Manager::SELECT,
				'label'   => __( 'Choose Category', 'betterlinks' ),
				'default' => '1',
				'options' => [
					'1' => esc_html__( 'Uncategorized', 'betterlinks' ),
					'2' => esc_html__( 'For Elementor', 'betterlinks' ),
					'3' => esc_html__( 'For Gutenberg', 'betterlinks' ),
				],
			]
		);

		$controls->add_control(
			'bl_ir_link_options_heading',
			[
				'type'  => Controls_Manager::HEADING,
				'label' => __( 'Link Options', 'betterlinks' ),
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
			]
		);
	}
}
