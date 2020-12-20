import React, { useState } from 'react'
import { site_url, copyToClipboard } from './../../utils/helper'

const LinkQuickAction = (props) => {
    const { short_url } = props
    const [isCopyUrl, setCopyUrl] = useState(false)
    const copyShortUrl = (url) => {
        copyToClipboard(url)
        setCopyUrl(true)
    }
    return (
        <React.Fragment>
            {/* <button className='dnd-link-button'>
                <span className='icon'>
                    <i className='btl btl-target'></i>
                </span>
            </button>
            <button className='dnd-link-button'>
                <span className='icon'>
                    <i className='btl btl-reload'></i>
                </span>
            </button> */}
            <button
                className='dnd-link-button'
                onClick={() => copyShortUrl(site_url + '/' + short_url)}
            >
                <span className='icon'>
                    {isCopyUrl ? (
                        <span className='dashicons dashicons-yes'></span>
                    ) : (
                        <i className='btl btl-link'></i>
                    )}
                </span>
            </button>
        </React.Fragment>
    )
}
export default LinkQuickAction
