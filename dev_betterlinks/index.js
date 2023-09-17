import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'App';
import store from 'redux/store';
import { createHooks } from '@wordpress/hooks';
window.betterLinksHooks = createHooks();

document.addEventListener('DOMContentLoaded', function () {
	const betterlinksbody = ReactDOM.createRoot(document.getElementById('betterlinksbody'));
	betterlinksbody.render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	);
});
