import { __ } from '@wordpress/i18n';
import SearchLoader from 'components/SearchLoader';
import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect } from 'react';
import ProBadge from 'components/Badge/ProBadge';
import { is_pro_enabled, pro_version_check } from 'utils/helper';
import Select from 'react-select';
import { toastWarning } from 'components/Toast';

const FilterComponent = (props) => {
	const { filterText, onFilter, searchClickHandler, searchStatus, isSearching, resetSearch, analytics, update_analytics_settings, id, selectedRows, bulkAction, setBulkAction, rowDeleteHandler, warning } = props;
	const [selectedValues, setSelectedValues] = useState([]);
	useEffect(() => {
		setSelectedValues(Object.values(analytics || []));
	}, [analytics]);
	const tag_id = betterLinksQuery.get('tag_id');
	const options = [
		{ label: __('Browser', 'betterlinks'), value: 'browser' },
		{ label: __('IP', 'betterlinks'), value: 'ip' },
		{
			label: (
				<div>
					{__('Country', 'betterlinks')} {!is_pro_enabled && <ProBadge />}
				</div>
			),
			value: 'country_name',
		},
		{
			label: (
				<div>
					{__('User Agent', 'betterlinks')} {!is_pro_enabled && <ProBadge />}
				</div>
			),
			value: 'user_agent',
		},
		{ label: __('Timestamp', 'betterlinks'), value: 'created_at' },
		{ label: __('Referer', 'betterlinks'), value: 'referer' },
		{
			label: (
				<div>
					{__('Parameters', 'betterlinks')} {!is_pro_enabled && <ProBadge />}
				</div>
			),
			value: 'query_params',
		},
		{
			label: __('OS', 'betterlinks'),
			value: 'os',
		},
		{
			label: __('Device', 'betterlinks'),
			value: 'device',
		},
	];
	return (
		<>
			<div className="btl-click-filter">
				<div className='btl-flex'>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{id && (
							<a
								className="btl-go-back-btn dashicons dashicons-arrow-left-alt"
								onClick={() => {
									window.history.go(-1);
									return false;
								}}
								href="#"
							/>
						)}
					</div>

					{selectedRows && selectedRows.length > 0 && (
						<div className="btl-bulk-actions">
							<Select
								className="btl-list-view-select"
								classNamePrefix="btl-react-select"
								defaultValue={{ value: '', label: __('Bulk Actions', 'betterlinks') }}
								value={bulkAction?.value ? bulkAction : { value: '', label: __('Bulk Actions', 'betterlinks') }}
								options={[
									{ value: 'delete', label: __('Delete', 'betterlinks') },
									...(id ? [{ value: 'fetch_country', label: <>{__('Fetch Country', 'betterlinks')} {(!is_pro_enabled || !pro_version_check('2.5.0')) && <ProBadge />}</> }] : []),
								]}
								onChange={(e) => setBulkAction(e)}
							/>
							<div className="btl-tooltip">
								<button
									className="btl-link-apply-button"
									onClick={() => {
										// Check if fetch_country action requires Pro update
										if (bulkAction?.value === 'fetch_country' && is_pro_enabled && !pro_version_check('2.5.0')) {
											toastWarning(
												__('Please update BetterLinks Pro to version 2.5.0 or later to use the Fetch Country feature.', 'betterlinks'),
												{
													title: __('Update Required', 'betterlinks'),
													duration: 5000,
												}
											);
											return;
										}
										rowDeleteHandler();
									}}
									disabled={bulkAction?.value === 'fetch_country' && (!is_pro_enabled || !pro_version_check('2.5.0'))}
								>
									{__('Apply', 'betterlinks')}
								</button>
								{warning && bulkAction.value !== 'delete' && bulkAction.value !== 'fetch_country' && <span className="btl-tooltiptext">Please Select Action.</span>}
							</div>
						</div>
					)}
				</div>
				<div style={{ display: 'flex' }}>
					<form onSubmit={searchClickHandler}>
						<input id="search" type="text" placeholder={__('Search...', 'betterlinks')} value={filterText} onChange={onFilter} />
						<button className="btl-search-button" type="submit" title={__('Searching', 'betterlinks')}>
							<SearchLoader searchStatus={searchStatus} />
						</button>
						{isSearching && (
							<button className="btl-search-button btl-search-reset" type="button" title={__('Reset Search', 'betterlinks')} onClick={resetSearch}>
								<span class="dashicons dashicons-image-rotate" />
							</button>
						)}
					</form>
					{id && !tag_id && (
						<MultiSelect
							options={options}
							value={selectedValues}
							onChange={(options) => {
								setSelectedValues(options);
								update_analytics_settings(options);
							}}
							labelledBy="Select"
							disableSearch={true}
							hasSelectAll={false}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default FilterComponent;
