import { __ } from '@wordpress/i18n';
import ActionButton from 'components/ActionButton';
import { useState } from 'react';

const CategoryQuickAction = ({ row, delete_tag, children }) => {
    const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);

    // Check if this is the default 'Uncategorized' category (ID: 1)
    const isDefaultCategory = row && (row.id == 1 || row.ID == 1);

    // Create a disabled version of setIsOpenDeleteBox that does nothing for default category
    const handleDeleteClick = () => {
        if (!isDefaultCategory) {
            setIsOpenDeleteBox(true);
        }
    };

    return (
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
        </div>
    );
};

export default CategoryQuickAction;
