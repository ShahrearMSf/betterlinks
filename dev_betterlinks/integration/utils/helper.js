export const { site_url } = window.betterLinksFlbIntegration;

export const formatFormData = (form_data, payload) => {
	Object.entries(payload).forEach(([key, value]) => {
		if (typeof value === 'object' && value !== null) {
			form_data.append(key, JSON.stringify(value));
		} else {
			form_data.append(key, value);
		}
	});

	return form_data;
};

export const copyToClipboard = (copyText) => {
	var tempInput = document.createElement('input');
	tempInput.value = copyText;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);
	return true;
};

export const makeShortUrl = (shortUrl) => {
	return shortUrl[0] === '/' ? site_url + shortUrl : site_url + '/' + shortUrl;
};
