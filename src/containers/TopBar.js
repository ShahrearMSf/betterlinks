import React, { useState, useEffect } from 'react'

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
        } else {
            document.body.classList.remove('betterlinks-dark-mode')
        }
        localStorage.setItem('betterLinksIsDarkMode', mode)
        setIsDarkMode(mode)
    }
    return (
        <div className='topbar'>
            <h1>BetterLinks</h1>
            <button onClick={() => darkModeHandler(!isDarkMode)}>
                {isDarkMode ? 'Dard Mode' : 'Light Mode'}
            </button>
        </div>
    )
}
export default TopBar
