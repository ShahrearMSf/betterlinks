import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { delete_tag, fetch_all_tags, fetch_terms_data } from 'redux/actions/terms.actions';
import { useEffect } from 'react';
import TopBar from 'containers/TopBar';
import { __ } from '@wordpress/i18n';
import AddNewTags from 'containers/AddNewTags';
import DataTable from 'react-data-table-component';
import TableLoader from 'components/Loader/TableLoader';
import TagQuickAction from 'containers/AddNewTags/TagQuickAction';
import Select from 'react-select';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { route_path } from 'utils/helper';

const ManageTags = (props) => {
	const [bulkActionData, setBulkActionData] = useState({});
	const [toggledClearRows, setToggleClearRows] = useState(false);
	const [searchText, setSearchText] = useState('');
	const { tags, tag_analytics } = props.terms;
	useEffect(() => {
		if (!tags) {
			props.fetch_all_tags();
			props.fetch_terms_data();
		}
	}, []);

	const columns = [
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
		{
			name: __('Analytic', 'betterlinks'),
			selector: 'link_count',
			sortable: false,
			cell: (row) => {
				const total_clicks = tag_analytics['total_clicks']?.[row.id] || 0;
				const unique_clicks = tag_analytics['unique_clicks']?.[row.id] || 0;
				return (
					<div>
						<button className="dnd-link-button btl-tooltip">
							<span className="btl-tooltiptext">
								Clicks: {total_clicks} / Unique Clicks: {unique_clicks}
							</span>
							<Link to={route_path + 'admin.php?page=betterlinks-analytics&tag_id=' + row.id}>
								{total_clicks}/{unique_clicks}
							</Link>
							{/* <span className="icon">
								{total_clicks}/{unique_clicks}
							</span> */}
						</button>
					</div>
				);
			},
		},
		{
			name: __('Action', 'betterlinks'),
			selector: 'link_count',
			sortable: false,
			cell: (row) => {
				return (
					<TagQuickAction delete_tag={() => props.delete_tag([{ tag_id: row.id || row.ID }])}>
						<AddNewTags tags={tags || []} icon={true} row={row} />
					</TagQuickAction>
				);
			},
		},
	];

	const __handleSearch = (e) => {
		setSearchText(e.target.value);
	};
	const getFilteredTags = () => {
		const regex = new RegExp(searchText, 'gi');
		const matchedTags = (tags || [])?.filter((item) => {
			return (item?.term_slug || '').match(regex);
		});
		return Array.isArray(matchedTags) ? matchedTags : tags;
	};
	const subHeaderComponent = (
		<TagActions bulkActionData={bulkActionData} setToggledClearRows={() => setToggleClearRows(!toggledClearRows)} delete_tag={props.delete_tag}>
			<div className="btl-autolink-filter btl-click-filter">
				<input id="search_autolink" type="search" placeholder="Search Tags" value={searchText} onChange={__handleSearch} />
			</div>
		</TagActions>
	);
	return (
		<>
			<TopBar label={__('Manage Tags', 'betterlinks')} render={() => <AddNewTags tags={tags} />} />
			<div className="btl-list-view">
				{tags ? (
					<DataTable
						className="btl-list-view-table"
						columns={columns}
						data={getFilteredTags()}
						pagination
						subHeader
						highlightOnHover
						subHeaderComponent={subHeaderComponent}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => setBulkActionData(e)}
						clearSelectedRows={toggledClearRows}
					/>
				) : (
					<>
						<TableLoader />
					</>
				)}
			</div>
		</>
	);
};

const TagActions = (props) => {
	const [bulkAction, setBulkAction] = useState({});
	const [warning, setWarning] = useState(false);
	const handleDeleteTags = (bulkActionData) => {
		if (bulkAction.value !== 'delete') return setWarning(true);
		setWarning(false);
		const selectedTags = bulkActionData.selectedRows.map((item) => ({ tag_id: item.id || item.ID }));
		props.delete_tag(selectedTags, bulkAction);
		setBulkAction({});
		return props.setToggledClearRows();
	};

	return (
		<React.Fragment>
			<div className="btl-links-filter">
				{props.bulkActionData && props.bulkActionData.selectedCount > 0 && (
					<div className="btl-bulk-actions">
						<Select
							className="btl-list-view-select"
							classNamePrefix="btl-react-select"
							defaultValue={{ value: '', label: __('Bulk Actions', 'betterlinks') }}
							value={bulkAction?.value ? bulkAction : { value: '', label: __('Bulk Actions', 'betterlinks') }}
							options={[{ value: 'delete', label: __('Delete', 'betterlinks') }]}
							onChange={(e) => setBulkAction(e)}
						/>
						<div className="btl-tooltip">
							<button className="btl-link-apply-button" onClick={() => handleDeleteTags(props.bulkActionData)}>
								{__('Apply', 'betterlinks')}
							</button>
							{warning && bulkAction?.value !== 'delete' && <span className="btl-tooltiptext">{__('Please Select Action', 'betterlinks')}</span>}
						</div>
					</div>
				)}
				{props.children}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_all_tags: bindActionCreators(fetch_all_tags, dispatch),
	fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	delete_tag: bindActionCreators(delete_tag, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTags);
