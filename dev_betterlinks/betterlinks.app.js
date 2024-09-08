(function ($) {
	const betterlinksTrack = {
		init() {
			this.trackUnCloakedLinksWithLinkID();
			this.trackUnCloakedLinksWithoutLinkID();
		},
		trackUnCloakedLinksWithoutLinkID() {
			const self = this;
			$(document).on('click', 'body a.betterlinks-linked-text:not([data-link-id])', function (e) {
				const target = e.target;
				if (!target?.href?.startsWith(betterLinksApp?.site_url)) {
					e.preventDefault();

					const targetUrl = target.href;
					// const form_data = new FormData();
					// form_data.append('action', 'betterlinks__js_analytics_tracking');
					// form_data.append('security', betterLinksApp.betterlinks_nonce);
					// form_data.append('target_url', targetUrl);

					self.redirectToTarget(e.target);

					// fetch(betterLinksApp.ajaxurl, {
					// 	method: 'POST',
					// 	body: form_data,
					// });
					self.initTracking('target_url', targetUrl);
				}
				return;
			});
		},
		trackUnCloakedLinksWithLinkID() {
			const self = this;
			$(document).on('click', 'body a.betterlinks-linked-text[data-link-id]', function (e) {
				e.preventDefault();

				const linkId = e.target.dataset?.linkId;
				// const form_data = new FormData();
				// form_data.append('action', 'betterlinks__js_analytics_tracking');
				// form_data.append('security', betterLinksApp.betterlinks_nonce);
				// form_data.append('linkId', linkId);

				self.redirectToTarget(e.target);

				// fetch(betterLinksApp.ajaxurl, {
				// 	method: 'POST',
				// 	body: form_data,
				// });
				self.initTracking('linkId', linkId);
			});
		},
		redirectToTarget(target) {
			if ('' !== target.target) {
				window.open(target.href, target.target);
				return;
			}
			window.location.href = target.href;
		},
		initTracking(key, value) {
			const form_data = new FormData();
			form_data.append('action', 'betterlinks__js_analytics_tracking');
			form_data.append('security', betterLinksApp.betterlinks_nonce);
			form_data.append(key, value);

			fetch(betterLinksApp.ajaxurl, {
				method: 'POST',
				body: form_data,
			});
		},
	};

	betterlinksTrack.init();
})(jQuery);
