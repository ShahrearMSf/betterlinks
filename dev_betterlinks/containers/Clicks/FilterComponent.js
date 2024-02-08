import { __ } from '@wordpress/i18n';
import SearchLoader from 'components/SearchLoader';
import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect } from 'react';

const FilterComponent = (props) => {
	const { filterText, onFilter, searchClickHandler, searchStatus, isSearching, resetSearch, analytics, update_analytics_settings, id } = props;
	const [selectedValues, setSelectedValues] = useState([]);
	useEffect(() => {
		setSelectedValues(Object.values(analytics || []));
	}, [analytics]);
	const tag_id = betterLinksQuery.get('tag_id');
	const options = [
		{ label: 'Browser', value: 'browser' },
		{ label: 'IP', value: 'ip' },
		{ label: 'Timestamp', value: 'created_at' },
		{ label: 'Referer', value: 'referer' },
		{
			label: 'OS',
			value: 'os',
		},
		{
			label: 'Device',
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
						<input id="search" type="text" placeholder={__('Search...', 'betterlinks')} value={filterText} onChange={onFilter} autoFocus />
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
