import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
};

const defaultProps = {
	type: '',
	label: '',
};

export default function ActionButton({ type, label }) {
	return (
		<React.Fragment>
			<div className="btl-tooltip">
				<button className="dnd-link-button ">
					<span className="icon">
						<i className={`btl btl-${type}`}></i>
					</span>
				</button>
				<span className="btl-tooltiptext">{label}</span>
			</div>
		</React.Fragment>
	);
}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;
