import React from 'react';
import { useLocation } from 'react-router-dom';
import DndCanvas from './../group/DndCanvas';
import Topbar from './../group/TopBar';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const ManageLinks = () => {
	const query = useQuery();
	const migration = query.get('migration');
	return (
		<React.Fragment>
			<Topbar />
			<DndCanvas />
		</React.Fragment>
	);
};
export default ManageLinks;
