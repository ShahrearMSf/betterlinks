import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import Navbar from 'components/Navbar';
import { is_pro_enabled, namespace, rest_url } from 'utils/helper';

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
	const [notice, setNotice] = useState(false);

	const getResponse = async () => {
		try {
			const response = await fetch(rest_url + namespace);
			const data = await response.json();

			if (!data?.namespace) {
				setNotice(true);
			}
			if (is_pro_enabled) {
				const proResponse = await fetch(rest_url + 'betterlinks-pro/v1');
				const proData = await proResponse.json();
				if (!proData?.namespace) {
					setNotice(true);
				}
			}
		} catch (error) {
			setNotice(true);
		}
	};
	useEffect(() => {
		getResponse();
	}, []);

	return (
		<React.Fragment>
			<MenuPortal>
				<Navbar />
			</MenuPortal>
			<Dashboard notice={notice} />
		</React.Fragment>
	);
};
export default App;
