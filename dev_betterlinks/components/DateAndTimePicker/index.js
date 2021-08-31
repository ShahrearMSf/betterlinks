import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function DateAndTimePicker(props) {
	const [field] = useField('expire.date');
	const [isDisable, setIsDisable] = useState(betterLinksHooks.applyFilters('isDisableLinkFormEditView', false, field.value));
	const onChangeHandler = (e) => {
		props.setFieldValue('expire.date', e);
		setIsDisable(false);
	};
	return (
		<React.Fragment>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DateTimePicker
					disablePast={true}
					label="DateTimePicker"
					inputVariant="outlined"
					value={field.value ? field.value : new Date()}
					onChange={(e) => onChangeHandler(e)}
					disabled={isDisable}
				/>
			</MuiPickersUtilsProvider>
		</React.Fragment>
	);
}

DateAndTimePicker.propTypes = propTypes;
DateAndTimePicker.defaultProps = defaultProps;
