import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import { subDays } from 'date-fns';

const getLinksListViewColumnData = (props) => {
	return [
		{
			name: __('Keywords', 'betterlinks'),
			selector: 'keywords',
			sortable: false,
		},
		{
			name: __('Shortened URL', 'betterlinks'),
			selector: 'short_url',
			sortable: false,
		},
		{
			name: __('Action', 'betterlinks'),
			selector: '',
			sortable: false,
		},
	];
};

const ListKeywords = (props) => {
	useEffect(() => {}, []);

	return (
		<React.Fragment>
			<div className="btl-list-view">
				<DataTable
					className="btl-list-view-table"
					columns={getLinksListViewColumnData()}
					data={[
						{
							keywords: 'WordPress, WP, ORG',
							short_url: 'http://example.com/go/help',
						},
						{
							keywords: 'wpdeveloper, essential-addons',
							short_url: 'http://example.com/go/help',
						},
					]}
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
