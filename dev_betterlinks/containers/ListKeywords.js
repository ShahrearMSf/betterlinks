import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import KeywordsQuickAction from 'components/KeywordsQuickAction';
import LinkCopyUrl from 'components/LinkCopyUrl';
import ProBadge from 'components/Badge/ProBadge';
import { delete_keyword, update_keyword } from 'redux/actions/keywords.actions';
import { is_pro_enabled, pro_version_check } from 'utils/helper';
import AddNewKeywords from './AddNewKeywords';

const KeywordFilter = (props) => {
	const [bulkAction, setBulkAction] = useState([]);
	const [statusFilter, setStatusFilter] = useState([]);
	const [warning, setWarning] = useState(false);

	const handleDeleteKeyword = (bulkActionData, bulkAction, deleteHandler) => {
		if (bulkAction.value !== 'delete') return setWarning(true);
		setWarning(false);
		deleteHandler(bulkActionData.selectedRows, bulkAction);
		setBulkAction({});
		return props.setToggledClearRows();
	};

	const handleBulkAction = () => {
		if (!bulkAction?.value) {
			return setWarning(true);
		}
		
		if (bulkAction.value === 'delete') {
			handleDeleteKeyword(props.bulkActionData, bulkAction, props.deleteKeywordHandler);
		} else if (bulkAction.value === 'change_status') {
			// Check if pro version is 2.6.1 or higher
			if (!is_pro_enabled || !pro_version_check('2.6.1')) {
				return; // Button will be disabled, this is just a safety check
			}
			if (!statusFilter?.value) {
				return setWarning(true);
			}
			setWarning(false);
			props.changeStatusHandler(props.bulkActionData.selectedRows, statusFilter.value);
			setBulkAction({});
			setStatusFilter({});
			return props.setToggledClearRows();
		}
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
							options={[
								{ value: 'delete', label: __('Delete', 'betterlinks') },
								{ value: 'change_status', label: <>{__('Change Status', 'betterlinks')} {(!is_pro_enabled || !pro_version_check('2.6.1')) && <ProBadge />}</> }
							]}
							onChange={(e) => {
								setBulkAction(e);
								setWarning(false);
								if (e.value !== 'change_status') {
									setStatusFilter({});
								}
							}}
						/>
						{bulkAction.value === 'change_status' && (
							<Select
								className="btl-list-view-select"
								classNamePrefix="btl-react-select"
								placeholder={__('Select Status', 'betterlinks')}
								value={statusFilter?.value ? statusFilter : null}
								options={[
									{ value: 'active', label: __('Active', 'betterlinks') },
									{ value: 'draft', label: __('Draft', 'betterlinks') }
								]}
								onChange={(e) => {
									setStatusFilter(e);
									setWarning(false);
								}}
							/>
						)}
						<div className="btl-tooltip">
							<button 
								className="btl-link-apply-button" 
								onClick={handleBulkAction}
								disabled={bulkAction?.value === 'change_status' && (!is_pro_enabled || !pro_version_check('2.6.1'))}
								title={bulkAction?.value === 'change_status' && (!is_pro_enabled || !pro_version_check('2.6.1')) ? __('Please update BetterLinks Pro to v2.6.1 or newer', 'betterlinks') : ''}
							>
								{bulkAction?.value === 'change_status' && (!is_pro_enabled || !pro_version_check('2.6.1')) ? __('Requires BetterLinks Pro v2.6.1+', 'betterlinks') : __('Apply', 'betterlinks')}
							</button>
							{warning && (
								<span className="btl-tooltiptext">
									{bulkAction.value === 'change_status' && !statusFilter?.value
										? __('Please Select Status', 'betterlinks')
										: __('Please Select Action', 'betterlinks')}
								</span>
							)}
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
			cell: (row) => {
				return (
					<AddNewKeywords postTypesProps={postTypesProps} linksForUpdateModal={linksForUpdateModal} data={row} keywords={keywords}>
						{<div style={{ textDecoration: 'underline' }}>{row?.keywords?.toString()}</div>}
					</AddNewKeywords>
				);
			},
		},
		{
			name: __('Status', 'betterlinks'),
			selector: 'is_active',
			sortable: false,
			width: '120px',
			center: true,
			cell: (row) => {
				const isActive = row.is_active !== undefined ? row.is_active : true;
				return (
					<span
						style={{
							padding: '4px 12px',
							borderRadius: '14px',
							fontSize: '12px',
							fontWeight: '500',
							backgroundColor: isActive ? '#d4edda' : '#f8d7da',
							color: isActive ? '#155724' : '#721c24',
							display: 'inline-block',
						}}
					>
						{isActive ? __('Active', 'betterlinks') : __('Draft', 'betterlinks')}
					</span>
				);
			},
		},
		{
			name: __('Shortened URL', 'betterlinks'),
			selector: 'short_url',
			sortable: false,
			cell: (row) => {
				const data = links.find((item) => item.value == row.link_id);
				if (!data?.value) return;
				return (
					<div>
						{data?.label ? (
							<LinkCopyUrl shortUrl={data.label} />
						) : (
							<span style={{ fontWeight: 'bold', color: 'red' }}>{__('No link selected or link may be deleted.', 'betterlinks')}</span>
						)}
					</div>
				);
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

const ListKeywords = ({ linksForUpdateModal, links, keywords, delete_keyword, update_keyword, postTypesProps, search }) => {
	const [bulkActionData, setBulkActionData] = useState({});
	const [toggledClearRows, setToggledClearRows] = useState(false);

	const handleClearRows = () => {
		setToggledClearRows(!toggledClearRows);
	};

	const handleChangeStatus = (selectedRows, status) => {
		// Update status for all selected keywords
		selectedRows.forEach((row) => {
			const updatedData = {
				...row,
				isActive: status === 'active',
				keywordStatus: status,
				keywords: row.keywords,
				oldKeywords: row.keywords,
				chooseLink: row.link_id,
				oldChooseLink: row.link_id,
				postType: row.post_type || [],
				category: row.category || [],
				tags: row.tags || [],
				openNewTab: row.open_new_tab || false,
				useNoFollow: row.use_no_follow || false,
				caseSensitive: row.case_sensitive || false,
				keywordBefore: row.keyword_before || '',
				keywordAfter: row.keyword_after || '',
				leftBoundary: row.left_boundary || '',
				rightBoundary: row.right_boundary || '',
				limit: row.limit || 100,
			};
			
			update_keyword(updatedData);
		});
	};

	const subHeaderComponent = (
		<KeywordFilter
			deleteKeywordHandler={delete_keyword}
			changeStatusHandler={handleChangeStatus}
			bulkActionData={bulkActionData}
			search={search}
			setBulkActionData={setBulkActionData}
			setToggledClearRows={handleClearRows}
		/>
	);

	return (
		<React.Fragment>
			<div className="btl-list-view btl-autolink-keyword">
				<DataTable
					className="btl-list-view-table"
					columns={getLinksListViewColumnData({ links, delete_keyword, keywords, postTypesProps, linksForUpdateModal })}
					data={keywords.data || []}
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
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		delete_keyword: bindActionCreators(delete_keyword, dispatch),
		update_keyword: bindActionCreators(update_keyword, dispatch),
	};
};
export default connect(null, mapDispatchToProps)(ListKeywords);
