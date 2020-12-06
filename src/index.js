/* global window, document */
if (!window._babelPolyfill) {
    require('@babel/polyfill/noConflict')
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Settings from './containers/Settings'
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Provider store={store}>
            <Settings />
        </Provider>,
        document.getElementById('betterlinksbody')
    )
})
