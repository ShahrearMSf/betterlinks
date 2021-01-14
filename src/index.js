/* global window, document */
if (!window._babelPolyfill) {
	require('@babel/polyfill/noConflict');
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import BetterLinks from './containers/BetterLinks';
import store from './redux/store';

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<BetterLinks />
			</Router>
		</Provider>,
		document.getElementById('betterlinksbody')
	);
});
