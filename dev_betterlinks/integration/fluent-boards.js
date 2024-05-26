import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
const { plugin_root_url } = window.betterLinksFlbIntegration;

const App = () => {
	useEffect(() => {
		const taskUrl = window.location.href;
		const urlParts = taskUrl.split('tasks/');
		const boardUrl = urlParts
	}, []);
	const __createBetterLinks = () => {};
	return (
		<>
			<button className="el-button" onClick={__createBetterLinks}>
				<i className="el-icon">
					<img width="16" src={plugin_root_url + 'assets/images/logo-large.svg'} alt={__('BetterLinks Colorfull Logo', 'betterlinks')} />
				</i>
				<span>{__('Create BetterLinks', 'betterlinks')}</span>
			</button>
		</>
	);
};

export default App;
