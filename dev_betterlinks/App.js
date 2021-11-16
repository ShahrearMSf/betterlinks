import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import Navbar from 'components/Navbar';

// Let’s clear the current menu content
const menuPage = document.getElementById('toplevel_page_betterlinks');
menuPage.innerHTML = '';
function MenuPortal({ children }) {
	return ReactDOM.createPortal(children, menuPage);
}

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const App = (props) => {
	window.betterLinksQuery = useQuery();

	return (
		<React.Fragment>
			<MenuPortal>
				<Navbar />
			</MenuPortal>
			<Dashboard />
		</React.Fragment>
	);
};
export default App;
