(function ($) {
	const BetterlinksApp = {};

	$(document).on('click', 'body a.betterlinks-linked-text, body a.btl_autolink_hyperlink', function (e) {
		e.preventDefault();
		console.info('hello from betterlinks');
	});
})(jQuery);
