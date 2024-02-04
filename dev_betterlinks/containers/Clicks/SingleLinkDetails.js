import ContentLoader from 'react-content-loader';
import { site_url } from 'utils/helper';
import { Link, Target, WWW } from './clicks.helper';

const SingleLinkDetails = ({ clicks }) => {
	const { link_title, short_url, target_url } = clicks;
	const StringLoader = () => (
		<ContentLoader speed={2} width={'100%'} height={10} viewBox="0 0 300 10" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
			<rect x="1" y="2" rx="3" ry="3" width="196" height="13" />
		</ContentLoader>
	);

	const shortend_url = `${site_url}/${short_url}`;
	return (
		<div className="btl-single-click-info-header">
			<div className="btl-single-info--name">
				<span className="btl-single-info-svg-icon" style={{ width: '20px', height: '20px', transform: 'scale(0.8)' }}>
					<Link />
				</span>
				<span className="btl-column-name" style={{ marginRight: '5px' }}>
					Link Name:
				</span>
				<span className="btl-link-name" title={link_title}>
					{link_title?.slice(0, 40) || <StringLoader />}
				</span>
			</div>
			<div className="btl-single-info-short-url btl-single-info--name">
				<span className="btl-single-info-svg-icon" style={{ width: '20px', height: '20px', transform: 'scale(0.8)' }}>
					<WWW />
				</span>
				<span className="btl-column-name" style={{ marginRight: '5px' }}>
					Shortened URL:
				</span>
				<a href={shortend_url} className="btl-link-name" target="_blank" title={shortend_url}>
					{short_url?.slice(0, 40) || <StringLoader />}
				</a>
			</div>
			<div className="btl-single-info-target-url btl-single-info--name">
				<span className="btl-single-info-svg-icon" style={{ width: '20px', height: '20px', transform: 'scale(0.8)' }}>
					<Target />
				</span>
				<span className="btl-column-name" style={{ marginRight: '5px' }}>
					Target URL:
				</span>
				<a href={target_url} className="btl-link-name" title={target_url} target="_blank">
					{target_url?.slice(0, 40) || <StringLoader />}
					{target_url?.length > 40 && '[...]'}
				</a>
			</div>
		</div>
	);
};

export default SingleLinkDetails;
