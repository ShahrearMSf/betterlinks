const AutoLinkInput = ({ isInputField, setInputField, autoShortLink, onSetAutoShortLink }) => {
	if (isInputField)
		return (
			<input
				autoFocus
				type="text"
				value={autoShortLink}
				onChange={(e) => onSetAutoShortLink(e.target.value)}
				onBlur={() => setInputField(false)}
				style={{ flexGrow: '1' }}
			/>
		);
	return (
		<p onClick={() => setInputField(true)} style={{ flexGrow: '1', margin: 0, alignSelf: 'center' }}>
			{autoShortLink}
		</p>
	);
};
export default AutoLinkInput;
