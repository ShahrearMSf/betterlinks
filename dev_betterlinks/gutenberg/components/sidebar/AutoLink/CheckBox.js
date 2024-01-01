import { CheckboxControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { edit_gutenberg_auto_link, fetch_auto_short_links_disable_ids } from 'redux/actions/gutenbergredirectlink.actions';

const DisableCheckbox = ({ isChecked, setChecked, ID }) => {
	const [postId, setPostId] = useState(null);

	useEffect(() => {
		const postId = wp.data.select('core/editor').getCurrentPostId();
		if (postId) {
			setPostId(postId);
		}
		fetch_auto_short_links_disable_ids(postId).then((response) => {
			if (response?.data?.data.includes('1')) {
				setChecked(true);
				edit_gutenberg_auto_link({
					disable_auto_short_link: true,
				});
			}
		});
	}, []);

	const onSetDisableAutoShortLink = (bool) => {
		setChecked(bool);
		edit_gutenberg_auto_link({
			disable_auto_short_link: bool,
			old_disable_auto_short_link: !bool,
		});
	};

	return (
		<>
			<CheckboxControl label="Disable Auto-Create Links on this post" help="" checked={isChecked} onChange={() => onSetDisableAutoShortLink(!isChecked)} />
		</>
	);
};

export default DisableCheckbox;
