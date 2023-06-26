import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { edit_link_expire_option, edit_gutenberg_auto_link } from 'redux/actions/gutenbergredirectlink.actions';
import { betterlinksGutenStore } from 'redux/gutenbergStore';

const DisableCheckbox = () => {
	const [isChecked, setChecked] = useState(false);
	let linkData = { ...(betterlinksGutenStore?.getState()?.gutenbergAutoLink || {}) };

	const onSetDisableAutoShortLink = (bool) => {
		setChecked(bool);
		edit_gutenberg_auto_link({
			disable_auto_short_link: bool,
		});
		// console.log(expire);
	};

	return (
		<>
			<CheckboxControl label="Disable Auto Short Link for this post/page" help="" checked={isChecked} onChange={() => onSetDisableAutoShortLink(!isChecked)} />
		</>
	);
};

export default DisableCheckbox;
