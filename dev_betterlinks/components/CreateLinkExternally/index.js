import { betterlinks_auth, site_url } from 'utils/helper';

const CreateLinkExternally = () => {
	return (
		<div
			style={{
				display: 'flex',
				'column-gap': '5px',
				'align-items': 'center',
			}}
		>
			<a
				href={`javascript:location.href='${site_url}/index.php?action=btl_cle&api_secret=${betterlinks_auth}&target_url='+encodeURI(location.href)`}
				className="button button-primary"
			>
				Create Link Externally
			</a>
			<span>Just drag this button in your bookmark</span>
		</div>
	);
};

export default CreateLinkExternally;
