/* global window, document */
if (!window._babelPolyfill) {
    require('@babel/polyfill/noConflict')
}

import React from 'react'
import ReactDOM from 'react-dom'
import Settings from './containers/Settings'
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <Settings />,
        document.getElementById('wpsp-dashboard-body')
    )
})
