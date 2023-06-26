import { CheckboxControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { edit_gutenberg_auto_link, fetch_auto_short_links_disable_ids, set_auto_short_links_disable_ids } from 'redux/actions/gutenbergredirectlink.actions';

const DisableCheckbox = ({ ID }) => {
	const [isChecked, setChecked] = useState(false);
	const [postId, setPostId] = useState(null);

	useEffect(() => {
		const postId = wp.data.select('core/editor').getCurrentPostId();
		if (postId) {
			setPostId(postId);
		}
		fetch_auto_short_links_disable_ids().then((response) => {
			if (Array.isArray(response?.data?.data) && postId) {
				const ids = response.data.data;
				if (ids.includes('' + postId)) {
					setChecked(true);
					edit_gutenberg_auto_link({
						disable_auto_short_link: true,
					});
				}
			}
		});
	}, []);

	const onSetDisableAutoShortLink = (bool) => {
		setChecked(bool);
		edit_gutenberg_auto_link({
			disable_auto_short_link: bool,
		});
		set_auto_short_links_disable_ids(postId);
	};

	return (
		<>
			<CheckboxControl label="Disable Auto Short Link for this post/page" help="" checked={isChecked} onChange={() => onSetDisableAutoShortLink(!isChecked)} />
		</>
	);
};

export default DisableCheckbox;
