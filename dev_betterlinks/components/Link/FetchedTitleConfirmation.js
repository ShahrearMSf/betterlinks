import { __ } from '@wordpress/i18n';

const FetchedTitleConfirmation = ({ fetchedTitle, handleYes, handleNo }) => {
	return (
		<div className="btl-modal-form-label-found">
			<span className="btl-modal-fetced-title">{fetchedTitle}</span>
			<br />
			<br />
			<div>
				<span>
					{__('Title found from target url, ', 'betterlinks')}
					<strong>{__('Overwrite Title?', 'betterlinks')}</strong>&nbsp;
				</span>
				<span className="btl-modal-title-overwrite btl-modal-title-overwrite-yes" onClick={handleYes}>
					{__('Yes', 'betterlinks')}
				</span>
				<span className="btl-modal-title-overwrite btl-modal-title-overwrite-no" onClick={handleNo}>
					{__('No', 'betterlinks')}
				</span>
			</div>
		</div>
	);
};

export default FetchedTitleConfirmation;
