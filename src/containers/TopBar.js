import React, { useState, useEffect } from 'react'
import { plugin_root_url } from './../utils/helper'
import { __ } from '@wordpress/i18n'
const TopBar = (props) => {
    const mode = localStorage.getItem('betterLinksIsDarkMode')
    const [isDarkMode, setIsDarkMode] = useState(mode)
    useEffect(() => {
        if (mode) {
            document.body.classList.add('betterlinks-dark-mode')
        } else {
            document.body.classList.remove('betterlinks-dark-mode')
        }
    }, [])

    const darkModeHandler = (mode) => {
        if (mode) {
            document.body.classList.add('betterlinks-dark-mode')
            localStorage.setItem('betterLinksIsDarkMode', mode)
        } else {
            document.body.classList.remove('betterlinks-dark-mode')
            localStorage.removeItem('betterLinksIsDarkMode')
        }

        setIsDarkMode(mode)
    }
    return (
        <div className='topbar'>
            <div className='tool-title'>
                <img
                    src={plugin_root_url + 'assets/images/logo-large.png'}
                    alt='logo'
                />
            </div>
            <label className='theme-mood-button' htmlFor='theme-mood'>
                <input
                    type='checkbox'
                    name='theme-mood'
                    id='theme-mood'
                    onClick={() => darkModeHandler(!isDarkMode)}
                    checked={isDarkMode}
                />
                <span className='theme-mood'>
                    <span className='icon'>
                        <i className='btl btl-sun'></i>
                    </span>
                    <span className='icon'>
                        <i className='btl btl-moon'></i>
                    </span>
                </span>
            </label>
        </div>
    )
}
export default TopBar
