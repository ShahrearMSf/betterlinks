import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'App';
import store from 'redux/store';
import { createHooks } from '@wordpress/hooks';
window.betterLinksHooks = createHooks();

document.addEventListener('DOMContentLoaded', function () {
	const betterlinksbody = document.getElementById('betterlinksbody');
	const root = createRoot(betterlinksbody);

	root.render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	);
});
