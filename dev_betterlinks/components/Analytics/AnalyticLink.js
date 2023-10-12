import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { is_pro_enabled, route_path } from 'utils/helper';

const AnalyticLink = ({ id, row, setUpgradeToProModal }) => {
	if (is_pro_enabled) {
		if (!id) {
			return (
				<Link to={`${route_path}admin.php?page=betterlinks-analytics&id=${row.link_id}`} className="btl-analytic-link-name">
					{row.link_title}
					<i className="btl btl-analytics" />
				</Link>
			);
		}
	}
	if (!id) {
		return (
			<div onClick={setUpgradeToProModal} className="btl-analytic-link-name">
				{row.link_title}
				<i className="btl btl-analytics" />
			</div>
		);
	}
	return row.link_title;
};

export default AnalyticLink;
