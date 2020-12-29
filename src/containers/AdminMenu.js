import React from 'react'
import { __ } from '@wordpress/i18n'
import { Link } from 'react-router-dom'
import { plugin_root_url } from './../utils/helper'
const AdminMenu = ({ query }) => {
    const currentPage = query.get('page')
    return (
        <React.Fragment>
            <Link
                to='/wp-admin/admin.php?page=betterlinks'
                className='wp-has-submenu wp-has-current-submenu wp-menu-open menu-top menu-icon-generic toplevel_page_betterlinks menu-top-last'
                aria-haspopup='false'
            >
                <div className='wp-menu-arrow'>
                    <div></div>
                </div>
                <div
                    className='wp-menu-image dashicons-before'
                    aria-hidden='true'
                >
                    <img
                        src={plugin_root_url + 'assets/images/logo.png'}
                        alt='logo'
                    />
                </div>
                <div className='wp-menu-name'>
                    {__('BetterLinks', 'betterlinks')}
                </div>
            </Link>
            <ul className='wp-submenu wp-submenu-wrap'>
                <li className='wp-submenu-head' aria-hidden='true'>
                    {__('BetterLinks', 'betterlinks')}
                </li>
                <li
                    className={`wp-first-item ${
                        currentPage == 'betterlinks' ? 'current' : ''
                    }`}
                >
                    <Link to='/wp-admin/admin.php?page=betterlinks'>
                        {__('BetterLinks', 'betterlinks')}
                    </Link>
                </li>
                <li
                    className={`wp-first-item ${
                        currentPage == 'betterlinks-clicks' ? 'current' : ''
                    }`}
                >
                    <Link to='/wp-admin/admin.php?page=betterlinks-clicks'>
                        {__('Clicks', 'betterlinks')}
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default AdminMenu
