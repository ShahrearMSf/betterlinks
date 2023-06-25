import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { edit_gutenberg_auto_link } from 'redux/actions/gutenbergredirectlink.actions';

const DisableCheckbox = () => {
	const [isChecked, setChecked] = useState(false);

	const onSetDisableAutoShortLink = (bool) => {
		setChecked(bool);
		edit_gutenberg_auto_link({ disable_short_link: bool });
	};

	return (
		<>
			<CheckboxControl label="Disable Auto Short Link for this post/page" help="" checked={isChecked} onChange={() => onSetDisableAutoShortLink(!isChecked)} />
		</>
	);
};

export default DisableCheckbox;
