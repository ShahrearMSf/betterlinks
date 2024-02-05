const SelectTeaser = (props) => {
	return (
		<div className="btl-role-item btl-form-group" onClick={openUpgradeToProModal}>
			<label className="btl-form-label">
				BetterLinks Category
				<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
			</label>
			<div className="link-options__body">
				<Select className="btl-modal-select" isDisabled={true} />
			</div>
		</div>
	);
};

export default SelectTeaser;
