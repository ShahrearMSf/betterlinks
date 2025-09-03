import { __ } from '@wordpress/i18n';
import ActionButton from 'components/ActionButton';
import PermissionModal from 'components/PermissionModal';
import { useState } from 'react';

const TagQuickAction = ({ delete_tag, children }) => {
	const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
	const [showPermissionModal, setShowPermissionModal] = useState(false);

	// Check if user has permission to manage tags and categories
	const hasPermission = () => {
		// Check if betterLinksProGlobal exists (pro version with role management)
		if (window.betterLinksProGlobal && typeof window.betterLinksProGlobal.user_can_manage_tags_categories !== 'undefined') {
			return window.betterLinksProGlobal.user_can_manage_tags_categories || window.betterLinksProGlobal.user_can_manage_options;
		}
		// Fallback for free version - only admins can manage
		return window.betterLinksGlobal && window.betterLinksGlobal.user_can_manage_options;
	};

	const handleDeleteClick = () => {
		if (!hasPermission()) {
			setShowPermissionModal(true);
			return;
		}
		setIsOpenDeleteBox(true);
	};

	const handleDeleteConfirm = () => {
		if (!hasPermission()) {
			setShowPermissionModal(true);
			return;
		}
		delete_tag();
	};
	return (
		<div className="btl-list-view-action-wrapper">
			{isOpenDeleteBox ? (
				<div className="btl-confirm-message">
					<span className="action-text">{__('Are You Sure?', 'betterlinks')}</span>
					<div className="action-set">
						<button className="action yes" onClick={handleDeleteConfirm}>
							{__('Yes', 'betterlinks')}
						</button>
						<button className="action no" onClick={() => setIsOpenDeleteBox(false)}>
							{__('No', 'betterlinks')}
						</button>
					</div>
				</div>
			) : (
				<>
					{children}
					<ActionButton onClickHandler={handleDeleteClick} type="delete" label={__('Delete Tag', 'betterlinks')} />
				</>
			)}
			<PermissionModal
				isOpen={showPermissionModal}
				onClose={() => setShowPermissionModal(false)}
				title={__('Delete Tag Permission Required', 'betterlinks')}
			/>
		</div>
	);
};

export default TagQuickAction;
