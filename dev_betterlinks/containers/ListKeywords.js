import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import KeywordsQuickAction from 'components/KeywordsQuickAction';
import LinkCopyUrl from 'components/LinkCopyUrl';
import { delete_keyword } from 'redux/actions/keywords.actions';

const KeywordFilter = (props) => {
	const [bulkAction, setBulkAction] = useState([]);
	const [warning, setWarning] = useState(false);

	const handleDeleteKeyword = (bulkActionData, bulkAction, deleteHandler) => {
		if (bulkAction.value !== 'delete') return setWarning(true);
		setWarning(false);
		deleteHandler(bulkActionData.selectedRows, bulkAction);
		return props.setBulkActionData((prev) => ({ ...prev, selectedCount: 0 }));
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
							options={[{ value: 'delete', label: __('Delete', 'betterlinks') }]}
							onChange={(e) => setBulkAction(e)}
						/>
						<div className="btl-tooltip">
							<button className="btl-link-apply-button" onClick={() => handleDeleteKeyword(props.bulkActionData, bulkAction, props.deleteKeywordHandler)}>
								{__('Apply', 'betterlinks')}
							</button>
							{warning && bulkAction.value !== 'delete' && <span className="btl-tooltiptext">Please Select Action.</span>}
						</div>
					</div>
				)}
				{props.search}
			</div>
		</React.Fragment>
	);
};

const getLinksListViewColumnData = ({ links, delete_keyword, keywords, postTypesProps, linksForUpdateModal }) => {
	return [
		{
			name: __('Keywords', 'betterlinks'),
			selector: 'keywords',
			sortable: false,
			cell: (row) => <div>{row.keywords.toString()}</div>,
		},
		{
			name: __('Shortened URL', 'betterlinks'),
			selector: 'short_url',
			sortable: false,
			cell: (row) => {
				const data = links.filter((item) => item.value == row.link_id);
				return <div>{data.length > 0 && <LinkCopyUrl shortUrl={data[0].label} />}</div>;
			},
		},
		{
			name: __('Action', 'betterlinks'),
			selector: '',
			sortable: false,
			cell: (row) => {
				const deleteKeywords = () => {
					delete_keyword([row]);
				};
				return (
					<>
						<KeywordsQuickAction keywords={keywords} postTypesProps={postTypesProps} linksForUpdateModal={linksForUpdateModal} data={row} deleteKeywordHandler={deleteKeywords} />
					</>
				);
			},
		},
	];
};

const ListKeywords = ({ linksForUpdateModal, links, keywords, delete_keyword, postTypesProps, search }) => {
	const [bulkActionData, setBulkActionData] = useState({});
	// const [keywordList, setKeywordList] = useState([]);
	// useEffect(() => {
	// 	setKeywordList(keywords.data || []);
	// }, [keywords]);

	const getData = (keywords) => {
		if (keywords.data) {
			return keywords.data;
		}
		return [];
	};

	const onSelectedRowsChange = (e) => {
		setBulkActionData(e);
	};

	const subHeaderComponent = <KeywordFilter deleteKeywordHandler={delete_keyword} bulkActionData={bulkActionData} search={search} setBulkActionData={setBulkActionData} />;

	return (
		<React.Fragment>
			<div className="btl-list-view btl-autolink-keyword">
				<DataTable
					className="btl-list-view-table"
					columns={getLinksListViewColumnData({ links, delete_keyword, keywords, postTypesProps, linksForUpdateModal })}
					data={getData(keywords)}
					pagination
					subHeader
					highlightOnHover
					subHeaderComponent={subHeaderComponent}
					persistTableHead
					selectableRows
					selectableRowsVisibleOnly
					onSelectedRowsChange={(e) => onSelectedRowsChange(e)}
				/>
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		delete_keyword: bindActionCreators(delete_keyword, dispatch),
	};
};
export default connect(null, mapDispatchToProps)(ListKeywords);
