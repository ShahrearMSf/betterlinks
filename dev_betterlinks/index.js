import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'App';
import store from 'redux/store';
import { createHooks } from '@wordpress/hooks';
window.betterLinksHooks = createHooks();

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
		<>
			<style>
				{`
				span.btl-expire-status-dot {
					height: 0;
					width: 0;
					border-radius: 50%;
					display: inline-block;
					padding: 5px;
					margin-right: 10px;
				}
				span.btl-expire-status-dot.expired {
					background-color: #f00;
				}
				span.btl-expire-status-dot.active {
					background-color: #0f0;
				}
				`}
			</style>

			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</>,
		document.getElementById('betterlinksbody')
	);
});
