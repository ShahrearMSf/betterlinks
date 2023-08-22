import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
const customStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '50%',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
const AffiliateDisclosurePreview = ({ isOpenModal, closeModal, settings }) => {
	const previewStyle = {
		backgroundColor: settings?.affiliate_disclosure_bg_color || '',
		width: settings?.affiliate_disclosure_width || '100%',
		padding: settings?.affiliate_disclosure_padding || '5px',
		fontSize: settings?.affiliate_disclosure_font_size || 'inherit',
		border: settings?.affiliate_disclosure_want_border
			? `${+settings?.affiliate_disclosure_border_size}px ${settings?.affiliate_disclosure_border_style['value']} ${settings?.affiliate_disclosure_border_color}`
			: 'none',
		borderRadius: settings?.affiliate_disclosure_want_border ? settings?.affiliate_disclosure_border_radius : 'unset',
	};
	return (
		<Modal isOpen={isOpenModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
			<div className="betterlinks-preview-modal" style={{ width: '90%' }}>
				<div
					className="betterlinks_affiliate_disclosure_post"
					dangerouslySetInnerHTML={{ __html: settings?.affiliate_disclosure_text }}
					style={settings?.affiliate_advanced_options ? previewStyle : {}}
				/>
				<button className="btn-close" onClick={closeModal} style={{ marginTop: '10px' }}>
					{__('Close', 'betterlinks')}
				</button>
			</div>
		</Modal>
	);
};

export default AffiliateDisclosurePreview;
