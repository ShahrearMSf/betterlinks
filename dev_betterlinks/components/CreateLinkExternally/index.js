import { betterlinks_auth, site_url } from 'utils/helper';

// javascript:location.href='http://wakanda-test.test/index.php?action=prli_bookmarklet&k=326443b6408eadc632232b5e026d9a2c&target_url='+escape(location.href);
const CreateLinkExternally = () => {
	console.log({ betterlinks_auth, location: location.href, site_url });
	return (
		<>
			<a href={`javascript:location.href='${site_url}/index.php?action=btl_cle&api_secret=${betterlinks_auth}&target_url=encodeURI(location.href);'`}>Create Link Externally</a>
			<p>Just drag this button in your bookmark</p>
		</>
	);
};

export default CreateLinkExternally;
