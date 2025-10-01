import { __ } from '@wordpress/i18n';
import SearchLoader from 'components/SearchLoader';
import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect } from 'react';
import ProBadge from 'components/Badge/ProBadge';
import { is_pro_enabled } from 'utils/helper';

const FilterComponent = (props) => {
	const { filterText, onFilter, searchClickHandler, searchStatus, isSearching, resetSearch, analytics, update_analytics_settings, id } = props;
	const [selectedValues, setSelectedValues] = useState([]);
	useEffect(() => {
		setSelectedValues(Object.values(analytics || []));
	}, [analytics]);
	const tag_id = betterLinksQuery.get('tag_id');
	const options = [
		{ label: __('Browser', 'betterlinks'), value: 'browser' },
		{ label: __('IP', 'betterlinks'), value: 'ip' },
		{ label: __('User Agent', 'betterlinks'), value: 'user_agent' },
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
