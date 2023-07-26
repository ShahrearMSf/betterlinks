import { __ } from '@wordpress/i18n';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const propTypes = {
	title: PropTypes.string,
};

export default function CheckList({ title = '', ...props }) {
	return (
		<div className="btl-role-item btl-form-group" {...props}>
			<label className="btl-form-label">
				{title}
				<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
			</label>
			<div className="link-options__body">
				<label className="btl-checkbox-field">
					<Field type="checkbox" className="btl-check" disabled />
					<span className="text" />
				</label>
			</div>
		</div>
	);
}

CheckList.propTypes = propTypes;
