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
					if (!'sendBeacon' in navigator) {
						e.preventDefault();
						self.redirectToTarget(e.target);
					}
					const values = {
						target_url: e.target.href,
					};
					self.initTracking(values);
				}
			});
		},
		trackUnCloakedLinksWithLinkID() {
			const self = this;
			$(document).on('click', 'body a.betterlinks-linked-text[data-link-id]', function (e) {
				if (!e.target?.href?.startsWith(betterLinksApp?.site_url)) {
					if (!'sendBeacon' in navigator) {
						e.preventDefault();
						self.redirectToTarget(e.target);
					}
					const linkId = e.target.dataset?.linkId;
					const values = {
						linkId,
					};
					self.initTracking(values);
				}
			});
		},
		redirectToTarget(target) {
			if ('' !== target.target) {
				window.open(target.href, target.target);
				return;
			}
			window.location.href = target.href;
		},
		async initTracking(values) {
			// Try to get country data from frontend geolocation service
			if (typeof geolocationService !== 'undefined') {
				try {
					const countryData = await geolocationService.getCountry();
					if (countryData) {
						values.country_code = countryData.country_code;
						values.country_name = countryData.country_name;
					}
				} catch (error) {
					console.warn('Failed to get country data:', error);
					// Continue with tracking even if geolocation fails
				}
			}

			const form_data = new FormData();
			form_data.append('action', 'betterlinks__js_analytics_tracking');
			form_data.append('security', betterLinksApp.betterlinks_nonce);

			Object.entries(values).forEach(([key, value]) => {
				form_data.append(key, value);
			});

			form_data.append('location', location.pathname);

			if ('sendBeacon' in navigator) {
				navigator.sendBeacon(betterLinksApp.ajaxurl, form_data);
			} else {
				fetch(betterLinksApp.ajaxurl, {
					method: 'POST',
					body: form_data,
				});
			}
		},
	};

	betterlinksTrack.init();
})(jQuery);
