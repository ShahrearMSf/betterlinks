(function ($) {
	const betterlinksTrack = {
		trackUnCloakedLinks() {
			const self = this;
			$(document).on('click', 'body a.betterlinks-linked-text[data-link-id]', function (e) {
				e.preventDefault();

				const linkId = e.target.dataset?.linkId;
				const form_data = new FormData();
				form_data.append('action', 'betterlinks__js_analytics_tracking');
				form_data.append('security', betterLinksApp.betterlinks_nonce);
				form_data.append('linkId', linkId);
				
				self.redirectToTarget(e.target);

				fetch(betterLinksApp.ajaxurl, {
					method: 'POST',
					body: form_data,
				}).catch((error) => {
					console.info(error);
				});
			});
		},
		redirectToTarget(target) {
			if ('' !== target.target) {
				window.open(target.href, target.target);
				return;
			}
			window.location.href = target.href;
		},
	};

	betterlinksTrack.trackUnCloakedLinks();
})(jQuery);
