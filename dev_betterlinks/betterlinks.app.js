(function ($) {
	/**
	 * Check if BetterLinks Pro version meets the minimum requirement
	 * Returns true if pro is not installed or if version is >= required version
	 * 
	 * @param {string} requiredVersion - Minimum required version
	 * @returns {boolean}
	 */
	const isProVersionValid = (requiredVersion) => {
		const proVersion = betterLinksApp?.betterlinkspro_version;
		// If pro is not installed, return false (country tracking requires pro >= 2.5.0)
		if (!proVersion) return false;
		
		const proVersionParts = proVersion.split('.').map(Number);
		const requiredParts = requiredVersion.split('.').map(Number);
		
		for (let i = 0; i < Math.max(proVersionParts.length, requiredParts.length); i++) {
			const proPart = proVersionParts[i] || 0;
			const reqPart = requiredParts[i] || 0;
			
			if (proPart > reqPart) return true;
			if (proPart < reqPart) return false;
		}
		return true; // Versions are equal
	};

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
			// Only if BetterLinks Pro v2.5.0 or newer is installed
			if (typeof geolocationService !== 'undefined' && isProVersionValid('2.5.0')) {
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
