import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import KeywordsQuickAction from './../../components/KeywordsQuickAction';
import { delete_keyword } from './../../redux/actions/keywords.actions';
import { subDays } from 'date-fns';

const KeywordFilter = (props) => {
	const [bulkAction, setBulkAction] = useState([]);
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
						<button className="btl-link-apply-button" onClick={() => props.deleteKeywordHandler(props.bulkActionData.selectedRows, bulkAction, props.deleteLinkHandler)}>
							{__('Apply', 'betterlinks')}
						</button>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

const getLinksListViewColumnData = (links, delete_keyword) => {
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
				const data = links.filter((item) => {
					if (item.value == row.link_id) {
						return true;
					}
				});
				return <div>{data.length > 0 && data[0].label}</div>;
			},
		},
		{
			name: __('Action', 'betterlinks'),
			selector: '',
			sortable: false,
			cell: (row) => {
				const deleteKeywords = () => {
					delete_keyword([{ link_id: row.link_id }]);
				};
				return (
					<>
						<KeywordsQuickAction links={links} data={row} deleteKeywordHandler={deleteKeywords} />
					</>
				);
			},
		},
	];
};

const ListKeywords = ({ links, keywords, delete_keyword }) => {
	const [bulkActionData, setBulkActionData] = useState({});
	useEffect(() => {}, []);

	const getData = (keywords) => {
		if (keywords.data) {
			return keywords.data;
		}
		return [];
	};

	const onSelectedRowsChange = (e) => {
		setBulkActionData(e);
	};

	const subHeaderComponentMemo = React.useMemo(() => {
		return <KeywordFilter deleteKeywordHandler={delete_keyword} bulkActionData={bulkActionData} />;
	}, [delete_keyword, bulkActionData]);

	return (
		<React.Fragment>
			<div className="btl-list-view">
				<DataTable
					className="btl-list-view-table"
					columns={getLinksListViewColumnData(links, delete_keyword)}
					data={getData(keywords)}
					pagination
					subHeader
					subHeaderComponent={subHeaderComponentMemo}
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
