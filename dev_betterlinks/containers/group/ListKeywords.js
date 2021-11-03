import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import KeywordsQuickAction from './../../components/KeywordsQuickAction';
import { subDays } from 'date-fns';

const getLinksListViewColumnData = (links) => {
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
			cell: (row) => <KeywordsQuickAction links={links} data={row} />,
		},
	];
};

const ListKeywords = ({ links, keywords }) => {
	useEffect(() => {}, []);

	const getData = (keywords) => {
		if (keywords.data) {
			return keywords.data;
		}
		return [];
	};
	return (
		<React.Fragment>
			<div className="btl-list-view">
				<DataTable
					className="btl-list-view-table"
					columns={getLinksListViewColumnData(links)}
					data={getData(keywords)}
					pagination
					subHeader
					persistTableHead
					selectableRows
					selectableRowsVisibleOnly
				/>
			</div>
		</React.Fragment>
	);
};
export default ListKeywords;
