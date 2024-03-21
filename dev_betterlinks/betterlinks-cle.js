(function ($) {
	const copyBtn = $('.btl-short-url-copy-button');

	copyBtn.click(function () {
		const img = $(this).find('.icon img'),
			span = $(this).find('.icon span');
		new ClipboardJS('.btl-short-url-copy-button');

		img.hide();
		span.show();
		let timer = setTimeout(function () {
			img.show();
			span.hide();
			clearTimeout(timer);
		}, 2000);
	});
})(jQuery);
