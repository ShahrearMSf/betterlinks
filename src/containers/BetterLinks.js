import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdminMenu from './group/AdminMenu';

// Let’s clear the current menu content
const menuPage = document.getElementById('toplevel_page_betterlinks');
menuPage.innerHTML = '';
function MenuPortal({ children }) {
	return ReactDOM.createPortal(children, menuPage);
}

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const BetterLinks = (props) => {
	window.betterLinksQuery = useQuery();
	return (
		<React.Fragment>
			<MenuPortal>
				<AdminMenu />
			</MenuPortal>
			<Dashboard />
		</React.Fragment>
	);
};
export default BetterLinks;
