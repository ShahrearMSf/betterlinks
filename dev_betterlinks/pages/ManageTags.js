import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_all_tags, fetch_terms_data } from 'redux/actions/terms.actions';
import { useEffect } from 'react';
import TopBar from 'containers/TopBar';
import { __ } from '@wordpress/i18n';
import AddNewTags from 'containers/AddNewTags';
import DataTable from 'react-data-table-component';
import TableLoader from 'components/Loader/TableLoader';

const ManageTags = (props) => {
	const [bulkActionData, setBulkActionData] = useState({});
	const [toggledClearRows, setToggleClearRows] = useState(false);
	const { tags } = props.terms;
	useEffect(() => {
		if (!tags) props.fetch_all_tags();
	}, []);

	// const groupedTerms = Object.groupBy(tags || [], ({ term_slug }) => term_slug);

	console.log(tags);

	return (
		<>
			<TopBar label={__('Manage Tags', 'betterlinks')} render={() => <AddNewTags tags={tags} />} />
			{tags ? (
				<div className="btl-list-view">
					<DataTable
						className="btl-list-view-table"
						columns={[
							{
								name: __('Tags', 'betterlinks'),
								selector: 'tags',
								sortable: false,
								cell: (row) => {
									return <div>{row.term_name}</div>;
								},
							},
							{
								name: __('Link Count', 'betterlinks'),
								selector: 'link_count',
								sortable: false,
								cell: (row) => {
									return <div>{+(row?.link_count || 0)}</div>;
								},
							},
						]}
						data={tags || []}
						pagination
						subHeader
						highlightOnHover
						// subHeaderComponent={subHeaderComponent}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => setBulkActionData(e)}
						clearSelectedRows={toggledClearRows}
					/>
				</div>
			) : (
				<>
					<TableLoader />
				</>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_all_tags: bindActionCreators(fetch_all_tags, dispatch),
	fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTags);
