<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( 'You are not allowed here.' );
}

	$link_title = ! empty( $results['link_title'] ) ? $results['link_title'] : '[No Title]';
	$target_url = ! empty( $results['target_url'] ) ? $results['target_url'] : '';
	$short_url  = ! empty( $results['short_url'] ) ? $results['short_url'] : '';
	$short_url  = site_url( $short_url );

	$truncated_link_title = 50 < strlen( $link_title ) ? substr( $link_title, 0, 50 ) . '[...]' : $link_title;
	$truncated_target_url = 50 < strlen( $target_url ) ? substr( $target_url, 0, 50 ) . '[...]' : $target_url;

	$nofollow         = ! empty( $results['nofollow'] ) ? 'checked' : '';
	$sponsored        = ! empty( $results['sponsored'] ) ? 'checked' : '';
	$param_forwarding = ! empty( $results['param_forwarding'] ) ? 'checked' : '';
	$track_me         = ! empty( $results['track_me'] ) ? 'checked' : '';
	$redirect_type    = ! empty( $results['redirect_type'] ) ? $results['redirect_type'] : '307';
	$link_date        = ! empty( $results['link_date'] ) ? date( 'd F Y', strtotime( $results['link_date'] ) ) : '';

	$copy_icon = BETTERLINKS_PLUGIN_ROOT_URI . 'assets/images/copy-icon.svg';
	wp_register_style( 'betterlinks-cle', BETTERLINKS_ASSETS_URI . 'css/betterlinks-cle.css', array( 'dashicons' ), BETTERLINKS_VERSION );
	wp_register_script( 'betterlinks-cle', BETTERLINKS_ASSETS_URI . 'js/betterlinks-cle.core.min.js', array( 'jquery', 'clipboard' ), BETTERLINKS_VERSION );
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php esc_html_e( 'Here is your BetterLink', 'betterlinks' ); ?></title>
	<?php wp_print_styles( 'betterlinks-cle' ); ?>
</head>
<body>
	<div class="btl-create-link-externally">
		<h1><?php esc_html_e( 'Here is your BetterLink', 'betterlinks' ); ?></h1>
		<h3 class="btl-cle-title" title="<?php esc_html_e( $link_title ); ?>"><?php esc_html_e( $truncated_link_title ); ?></h3>
		<div title="<?php esc_html_e( $target_url ); ?>">(<?php esc_html_e( $truncated_target_url ); ?>)</div>
		<div class="btl-shortened-url">
			<span><?php esc_html_e( $short_url ); ?></span>
			<button class="btl-short-url-copy-button btl-tooltip" data-clipboard-text="<?php esc_html_e( $short_url ); ?>">
				<span class="icon">
					<img width="27" src="<?php esc_attr_e( $copy_icon ); ?>" alt="icon">
					<span class="dashicons dashicons-yes" style="display: none;"></span>
				</span>
			</button>
            <a href="<?php esc_html_e( $short_url ); ?>" target="_blank" class="dashicons dashicons-external"></a>
		</div>

		<hr>
        <div class="btl-social-share">
            <span class="dashicons dashicons-share"></span> Share to
			<div>
			<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode( $short_url ); ?>" target="_blank">
				<div id="fb-share-button" class="share-button">
					<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet">
						<path class="svg-icon-path" d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
					</svg>
				</div>
			</a>
			<a href="https://twitter.com/intent/tweet?url=<?php echo urlencode( $short_url ); ?>" target="_blank">
				<div id="x-share-button" class="share-button">
						<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
							<path d="M 2.8671875 3 L 9.7363281 12.818359 L 2.734375 21 L 5.3808594 21 L 10.919922 14.509766 L 15.460938 21 L 21.371094 21 L 14.173828 10.697266 L 20.744141 3 L 18.138672 3 L 12.996094 9.0097656 L 8.7988281 3 L 2.8671875 3 z"></path>
						</svg>
					</div>
				</div>
			</a>
        </div>
		
        <hr>

		<div>No Follow <input type="checkbox" <?php esc_html_e( $nofollow ); ?> onclick="return false" style="cursor: not-allowed;"></div>
		<div>Sponsored <input type="checkbox" <?php esc_html_e( $sponsored ); ?> onclick="return false" style="cursor: not-allowed;"></div>
		<div>Parameter Forwarding <input type="checkbox" <?php esc_html_e( $param_forwarding ); ?> onclick="return false" style="cursor: not-allowed;"></div>
		<div>Tracking <input type="checkbox" <?php esc_html_e( $track_me ); ?> onclick="return false" style="cursor: not-allowed;"></div>

		<hr>

		<div>Created at <?php echo $link_date; ?></div>
		
		<a href="<?php echo esc_url_raw( $target_url ); ?>" title="Go Back"><?php esc_html_e( 'Go Back', 'betterlinks' ); ?></a>
	</div>

	<?php wp_print_scripts( 'betterlinks-cle' ); ?>
</body>
</html>