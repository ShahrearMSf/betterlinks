(function ($) {
	const BetterlinksApp = {
		unclokaedLinkAnalytics() {
			const app = this;
			$(document).on('click', 'body a.betterlinks-linked-text[data-link-id]', function (e) {
				e.preventDefault();
				const linkId = e.target.dataset?.linkId;

				// console.info(app);
				// return;

				const form_data = new FormData();
				form_data.append('action', 'betterlinks__js_analytics_trakcing');
				form_data.append('security', betterLinksApp.betterlinks_nonce);
				form_data.append('linkId', linkId);

				fetch(betterLinksApp.ajaxurl, {
					method: 'POST',
					body: form_data,
				})
					.then((res) => res.json())
					.then((data) => {
						if (data) {
							app.getLinkTargetWindow(e.target);
						}
					});
			});
		},
		getLinkTargetWindow(target) {
			if ('' !== target.target) {
				window.open(target.href, target.target || '');
				return;
			}
			window.location.href = target.href;
		},
	};

	BetterlinksApp.unclokaedLinkAnalytics();
})(jQuery);
