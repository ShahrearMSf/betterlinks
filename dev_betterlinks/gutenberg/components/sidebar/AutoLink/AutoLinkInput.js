const AutoLinkInput = ({ autoShortLink, onSetAutoShortLink }) => {
	return <input type="text" value={autoShortLink} onChange={(e) => onSetAutoShortLink(e.target.value)} style={{ flexGrow: '1' }} />;
};
export default AutoLinkInput;
