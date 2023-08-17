import { __ } from '@wordpress/i18n';
import ReactQuill from 'react-quill';
import { edit_gutenberg_affiliate } from 'redux/actions/gutenbergredirectlink.actions';
import { useEffect } from 'react';

const modules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ color: [] }, { background: [] }],
		[{ header: '1' }, { header: '2' }],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image'],
		['clean'],
	],
};
// const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video'];
const QuillEditor = ({ html, setHtml }) => {
	const theme = 'snow';
	const handleChange = (html) => {
		setHtml(html);
		edit_gutenberg_affiliate({
			affiliate_disclosure_text: html,
		});
	};

	useEffect(() => {
		const colorPicker = document.querySelectorAll('.ql-picker-label');
		colorPicker.forEach(function (item) {
			item.addEventListener('click', function (e) {
				e.preventDefault();
			});
		});
	}, []);

	return (
		<span className="btl-form-group btl-general-tab-settings-react-select">
			<label className="btl-form-label">{__('AFFILIATE LINK TEXT', 'betterlinks-pro')}</label>
			<div className="btl-form-field">
				<label className="btl-checkbox-field block">
					<div className="btl-affiliate-disclosure-editor">
						<ReactQuill theme={theme} onChange={handleChange} value={html} modules={modules} placeholder={'Type here...'} />
					</div>
					{/* <div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline" />
						<span className="btl-tooltiptext">{__('Select the position where you want to set the Affiliate Disclosure', 'betterlinks-pro')}</span>
					</div> */}
				</label>
			</div>
		</span>
	);
};

export default QuillEditor;
