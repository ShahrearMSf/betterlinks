(function ($) {
	const betterlinksTrack = {
		init() {
			this.trackUnCloakedLinksWithLinkID();
			this.trackUnCloakedLinksWithoutLinkID();
		},
		trackUnCloakedLinksWithoutLinkID() {
			const self = this;
			$(document).on('click', 'body a.betterlinks-linked-text:not([data-link-id])', function (e) {
				if (!e.target?.href?.startsWith(betterLinksApp?.site_url)) {
					e.preventDefault();

					self.redirectToTarget(e.target);
					self.initTracking('target_url', e.target.href);
				}
				return;
			});
		},
		trackUnCloakedLinksWithLinkID() {
			const self = this;
			$(document).on('click', 'body a.betterlinks-linked-text[data-link-id]', function (e) {
				e.preventDefault();

				const linkId = e.target.dataset?.linkId;
				self.redirectToTarget(e.target);
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
