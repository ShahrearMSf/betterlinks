import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
import Link from './../../components/Link';
import { plugin_root_url } from '../../utils/helper';
import { linksView } from './../../redux/actions/activity.actions';
const TopBar = (props) => {
	const mode = localStorage.getItem('betterLinksIsDarkMode');
	const [isDarkMode, setIsDarkMode] = useState(mode ? mode : false);
	useEffect(() => {
		if (mode) {
			document.body.classList.add('betterlinks-dark-mode');
		} else {
			document.body.classList.remove('betterlinks-dark-mode');
		}
	}, []);

	const darkModeHandler = (mode) => {
		if (mode) {
			document.body.classList.add('betterlinks-dark-mode');
			localStorage.setItem('betterLinksIsDarkMode', mode);
		} else {
			document.body.classList.remove('betterlinks-dark-mode');
			localStorage.removeItem('betterLinksIsDarkMode');
		}

		setIsDarkMode(mode);
	};
	return (
		<div className="topbar">
			<div className="tool-title">
				<img src={plugin_root_url + `assets/images/logo-large${isDarkMode ? '-white' : ''}.svg`} alt="logo" />
			</div>
			<div className="btl-create-links">
				<Link submitHandler={props.add_new_link} />
			</div>
			<div className="btl-view-control">
				<button onClick={() => props.linksView('list')}>List View</button>
				<button onClick={() => props.linksView('grid')}>Grid View</button>
			</div>
			<label className="theme-mood-button" htmlFor="theme-mood">
				<input type="checkbox" name="theme-mood" id="theme-mood" value={isDarkMode} onChange={() => darkModeHandler(!isDarkMode)} checked={isDarkMode} />
				<span className="theme-mood">
					<span className="icon">
						<i className="btl btl-sun"></i>
					</span>
					<span className="icon">
						<i className="btl btl-moon"></i>
					</span>
				</span>
			</label>
		</div>
	);
};

const mapStateToProps = (state) => ({
	activity: state.activity,
});

const mapDispatchToProps = (dispatch) => {
	return {
		linksView: bindActionCreators(linksView, dispatch),
		add_new_link: bindActionCreators(add_new_link, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
