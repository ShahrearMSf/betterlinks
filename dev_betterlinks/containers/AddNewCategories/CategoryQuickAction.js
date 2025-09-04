import { __ } from '@wordpress/i18n';
import ActionButton from 'components/ActionButton';
import PermissionModal from 'components/PermissionModal';
import { useState } from 'react';

const CategoryQuickAction = ({ row, delete_tag, children }) => {
    const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);

    // Check if this is the default 'Uncategorized' category (ID: 1)
    const isDefaultCategory = row && (row.id == 1 || row.ID == 1);

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
        <>
            <div className="btl-list-view-action-wrapper">
                {isOpenDeleteBox ? (
                    <div className="btl-confirm-message">
                        <span className="action-text">{__('Are You Sure?', 'betterlinks')}</span>
                        <div className="action-set">
                            <button className="action yes" onClick={delete_tag}>
                                {__('Yes', 'betterlinks')}
                            </button>
                            <button className="action no" onClick={() => setIsOpenDeleteBox(false)}>
                                {__('No', 'betterlinks')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Edit button for action column */}
                        {isDefaultCategory ? (
                            // Show disabled edit button for default category in action column
                            <div className="btl-tooltip">
                                <button
                                    className="dnd-link-button"
                                    disabled
                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                    title={__("Default Category can't be edited.", 'betterlinks')}
                                >
                                    <span className="icon">
                                        <i className="btl btl-edit"></i>
                                    </span>
                                </button>
                                <span className="btl-tooltiptext">{__("Default Category can't be edited.", 'betterlinks')}</span>
                            </div>
                        ) : (
                            children
                        )}

                        {/* Delete button */}
                        {isDefaultCategory ? (
                            // Show disabled delete button for default category
                            <div className="btl-tooltip">
                                <button
                                    className="dnd-link-button"
                                    disabled
                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                    title={__("Default Category can't be deleted.", 'betterlinks')}
                                >
                                    <span className="icon">
                                        <i className="btl btl-delete"></i>
                                    </span>
                                </button>
                                <span className="btl-tooltiptext">{__("Default Category can't be deleted.", 'betterlinks')}</span>
                            </div>
                        ) : (
                            <ActionButton
                                onClickHandler={handleDeleteClick}
                                type="delete"
                                label={__('Delete Category', 'betterlinks')}
                            />
                        )}
                    </>
                )}
                <PermissionModal
                    isOpen={showPermissionModal}
                    onClose={() => setShowPermissionModal(false)}
                    title={__('Delete Category Permission Required', 'betterlinks')}
                />
            </div>
        </>
    );
};

export default CategoryQuickAction;
