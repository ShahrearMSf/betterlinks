import { __ } from '@wordpress/i18n';
import ActionButton from 'components/ActionButton';
import { useState } from 'react';

const CategoryQuickAction = ({ delete_tag, children }) => {
    const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
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
                    {children}
                    <ActionButton onClickHandler={setIsOpenDeleteBox} type="delete" label={__('Delete Category', 'betterlinks')} />
                </>
            )}
        </div>
    );
};

export default CategoryQuickAction;
