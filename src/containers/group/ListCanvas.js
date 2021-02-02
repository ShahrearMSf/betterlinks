import React from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
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
			return <div>{row.link_title}</div>;
		},
	},
	{
		name: __('Shortened URL', 'betterlinks'),
		selector: 'short_url',
		sortable: false,
		cell: (row) => <div>{row.short_url}</div>,
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

const ListCanvas = (props) => {
	const { links } = props.links;
	var stored = Object.values(links).reduce(function (total, item) {
		total = [...total, ...item.lists];
		return total;
	}, []);
	return (
		<React.Fragment>
			<div>
				<DataTable className="btl-analytic-table" columns={columns} data={stored} pagination persistTableHead />
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
