<?php
namespace BetterLinks;

use Elementor\Controls_Manager;

class Elementor {
	public function __construct() {
		add_action( 'elementor/element/before_section_end', [ $this, 'add_controller' ], 10, 3 );
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
	}
}
