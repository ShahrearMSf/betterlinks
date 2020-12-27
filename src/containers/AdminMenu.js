import React from 'react'
import { Link } from 'react-router-dom'
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
                    className='wp-menu-image dashicons-before dashicons-admin-generic'
                    aria-hidden='true'
                >
                    <br />
                </div>
                <div className='wp-menu-name'>Better Links</div>
            </Link>
            <ul className='wp-submenu wp-submenu-wrap'>
                <li className='wp-submenu-head' aria-hidden='true'>
                    Better Links
                </li>
                <li
                    className={`wp-first-item ${
                        currentPage == 'betterlinks' ? 'current' : ''
                    }`}
                >
                    <Link to='/wp-admin/admin.php?page=betterlinks'>
                        Better Links
                    </Link>
                </li>
                <li
                    className={`wp-first-item ${
                        currentPage == 'betterlinks-clicks' ? 'current' : ''
                    }`}
                >
                    <Link to='/wp-admin/admin.php?page=betterlinks-clicks'>
                        Clicks
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default AdminMenu
