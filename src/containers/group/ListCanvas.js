import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { fetch_links_data, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
import CreateCategory from './../../components/CreateCategory';
import Link from './../../components/Link';
import CatHeader from './../../components/CatHeader';
import LinkQuickAction from './../../components/LinkQuickAction';
const columns = [
	{
		name: __('', 'betterlinks'),
		selector: '',
		sortable: false,
		cell: (row) => {
			return (
				<div>
					<input type="checkbox" />
				</div>
			);
		},
	},
	{
		name: __('Title', 'betterlinks'),
		selector: 'link_title',
		sortable: false,
		cell: (row) => {
			return <div className="btl-link-title">{row.link_title}</div>;
		},
	},
	{
		name: __('Shortened URL', 'betterlinks'),
		selector: 'short_url',
		sortable: false,
		cell: (row) => {
			return <div className="btl-short-url-wrapper">
				<span className="btl-short-url">{row.short_url}</span>
				<button className="btl-short-url-copy-button"><i className="btl btl-link"></i></button>
			</div>
		},
	},
	{
		name: __('Redirect Type', 'betterlinks'),
		selector: 'redirect_type',
		sortable: false,
		cell: (row) => <div>{row.redirect_type}</div>,
	},
	{
		name: __('Clicks', 'betterlinks'),
		selector: '',
		sortable: false,
		cell: (row) => <div>Clicks</div>,
	},
	{
		name: __('Date', 'betterlinks'),
		selector: 'link_date',
		sortable: false,
		cell: (row) => <div>{row.link_date}</div>,
	},
	{
		name: __('Action', 'betterlinks'),
		selector: '',
		sortable: false,
		cell: (row) => <div>Action</div>,
	},
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<React.Fragment>
		<div className="btl-links-filter">
			<div className="btl-click-filter">
				<input id="search" type="text" placeholder={__('Search short link', 'betterlinks')} value={filterText} onChange={onFilter} />
			</div>
			<Select
				className="btl-list-view-select"
				classNamePrefix="btl-react-select"
				options={[
					{ value: '', label: 'Categories' },
					{ value: 'shop', label: 'shop' },
				]}
			/>
			<Select
				className="btl-list-view-select"
				classNamePrefix="btl-react-select"
				options={[
					{ value: '', label: 'Short by Clicks' },
					{ value: 'unique', label: 'Unique Clicks' },
					{ value: 'clicks', label: 'All Clicks' },
				]}
			/>
			<Select
				className="btl-list-view-select"
				classNamePrefix="btl-react-select"
				options={[
					{ value: '', label: 'All Dates' },
					{ value: 'Jan 2021', label: 'Unique Clicks' },
				]}
			/>
			<input className="btl-link-input-field" placeholder="Links to Show" />
			<button className="btl-link-filter-button">Filter</button>
		</div>
		<div className="btl-bulk-actions">
			<Select
				className="btl-list-view-select"
				classNamePrefix="btl-react-select"
				options={[
					{ value: '', label: 'Bulk Actions' },
					{ value: 'delete', label: 'Delete' },
				]}
			/>
			<button className="btl-link-apply-button">Apply</button>
		</div>
	</React.Fragment>
);

const ListCanvas = (props) => {
	const { links } = props.links;
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	var stored = Object.values(links).reduce(function (total, item) {
		total = [...total, ...item.lists];
		return total;
	}, []);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
	}, [filterText, resetPaginationToggle]);

	return (
		<React.Fragment>
			<div className="btl-list-view">
				<DataTable
					className="btl-list-view-table"
					columns={columns}
					data={stored.filter((item) => item.link_title && item.link_title.toLowerCase().includes(filterText.toLowerCase()))}
					pagination
					paginationResetDefaultPage={resetPaginationToggle}
					subHeader
					subHeaderComponent={subHeaderComponentMemo}
					persistTableHead
				/>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	links: state.links,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
		add_new_cat: bindActionCreators(add_new_cat, dispatch),
		add_new_link: bindActionCreators(add_new_link, dispatch),
		edit_link: bindActionCreators(edit_link, dispatch),
		delete_link: bindActionCreators(delete_link, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCanvas);
