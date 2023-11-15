import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { is_pro_enabled, route_path } from 'utils/helper';

const AnalyticLink = ({ id, row, setUpgradeToProModal }) => {
	return row.link_title;
};

export default AnalyticLink;
