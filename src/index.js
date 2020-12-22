/* global window, document */
if (!window._babelPolyfill) {
    require('@babel/polyfill/noConflict')
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { page } from './utils/helper'
import store from './redux/store'
import Settings from './containers/Settings'
import Clicks from './containers/Clicks'
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Provider store={store}>
            {page === 'betterlinks' ? <Settings /> : <Clicks />}
        </Provider>,
        document.getElementById('betterlinksbody')
    )
})
