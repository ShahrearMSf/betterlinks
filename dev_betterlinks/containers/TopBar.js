import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';
import { linksView } from 'redux/actions/activity.actions';
import DeleteClicks from 'containers/DeleteClicks';

import PropTypes from 'prop-types';

const propTypes = {
	label: PropTypes.string,
	render: PropTypes.func,
};

const defaultProps = {
	label: '',
	render: () => {},
};

const TopBar = (props) => {
	const { propsForAnalytics } = props;
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
	const currentPage = betterLinksQuery.get('page');
	return (
		<div className="topbar">
			<div className="topbar__logo">
				<img src={plugin_root_url + `assets/images/logo-large${isDarkMode ? '-white' : ''}.svg`} alt="logo" />
				<span className="topbar__logo__text">{props.label}</span>
			</div>

			{props.render()}
			<div className="topbar-inner">
				{currentPage === 'betterlinks' && (
					<React.Fragment>
						<div className="btl-view-control">
							<button className={`btl-link-view-toggler ${props.activity.linksView == 'list' ? 'active' : ''}`} onClick={() => props.linksView('list')}>
								<i className="btl btl-list"></i>
							</button>
							<button className={`btl-link-view-toggler ${props.activity.linksView == 'grid' ? 'active' : ''}`} onClick={() => props.linksView('grid')}>
								<i className="btl btl-grid"></i>
							</button>
						</div>
					</React.Fragment>
				)}
				{propsForAnalytics?.isResetAnalytics && <DeleteClicks propsForAnalytics={propsForAnalytics} />}
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
		</div>
	);
};

TopBar.propTypes = propTypes;
TopBar.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
	activity: state.activity,
});

const mapDispatchToProps = (dispatch) => {
	return {
		linksView: bindActionCreators(linksView, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
