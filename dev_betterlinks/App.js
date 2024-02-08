import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import Navbar from 'components/Navbar';
import { API, is_pro_enabled, makeRequest, menu_notice, namespace, rest_url } from 'utils/helper';

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
	const [menuNotice, setMenuNotice] = useState(menu_notice !== localStorage.getItem('betterlinks__admin_menu_notice'));
	const [dashboardNotice, setDashboardNotice] = useState(menu_notice !== localStorage.getItem('betterlinks__admin_dashboard_notice'));

	const getResponse = async () => {
		try {
			const res = await API.get(namespace);

			if (res?.status !== 200) {
				setNotice(true);
			}
			if (is_pro_enabled) {
				const proResponse = await API.get('betterlinks-pro/v1/');

				if (proResponse?.status !== 200) {
					setNotice(true);
				}
			}
		} catch (error) {
			setNotice(true);
		}
	};

	const getMenuNotice = async () => {
		const stored_menu_notice = localStorage.getItem('betterlinks__admin_menu_notice');
		if (menu_notice !== stored_menu_notice) {
			try {
				makeRequest({
					action: 'betterlinks__admin_menu_notice',
				}).then((response) => {
					if (response.data) {
						localStorage.setItem('betterlinks__admin_menu_notice', response.data.result);
						setMenuNotice(menu_notice !== response.data.result);
					}
				});
			} catch (error) {
				console.log('error is ' + error.message);
			}
		}
	};
	useEffect(() => {
		getResponse();
		getMenuNotice();
	}, []);

	useEffect(() => {
		const stored_dashboard_notice = localStorage.getItem('betterlinks__admin_dashboard_notice');
		if (menu_notice !== stored_dashboard_notice) {
			const btl = document.querySelector('.btl-dashboard-notice .notice-dismiss');
			btl?.addEventListener('click', () => {
				try {
					makeRequest({
						action: 'betterlinks__admin_dashboard_notice',
					}).then((response) => {
						if (response.data) {
							localStorage.setItem('betterlinks__admin_dashboard_notice', response.data.result);
							setDashboardNotice(menu_notice !== response.data.result);
						}
					});
				} catch (error) {
					console.log('error is ' + error.message);
				}
			});
		}
	}, []);

	return (
		<React.Fragment>
			<MenuPortal>
				<Navbar menuNotice={menuNotice} />
			</MenuPortal>
			<Dashboard notice={notice} menuNotice={menuNotice} />
		</React.Fragment>
	);
};
export default App;
