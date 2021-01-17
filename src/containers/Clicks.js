import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Analytics from './../components/Analytics';
import TableLoader from '../components/Loader/TableLoader';
import Topbar from './TopBar';
import { site_url, plugin_root_url, getBrowser, formatDate } from './../utils/helper';
import { fetch_clicks_data } from './../redux/actions/clicks.actions';

const columns = [
	{
		name: 'Browser',
		selector: 'browser',
		sortable: false,
		cell: (row) => (
			<div>
				<img src={`${plugin_root_url}assets/images/browser/${getBrowser(row.browser)}.png`} alt="" />
			</div>
		),
	},
	{
		name: 'IP',
		selector: 'ip',
		sortable: false,
		cell: (row) => <div>{row.ip + '(' + row.IPCOUNT + ')'}</div>,
	},
	{
		name: 'Timestamp',
		selector: 'created_at',
		sortable: false,
	},
	{
		name: 'Shortened URL',
		selector: 'short_url',
		sortable: false,
		cell: (row) => <div>{site_url + '/' + row.short_url}</div>,
	},
	{
		name: 'Referrer',
		selector: 'referer',
		sortable: false,
	},
	{
		name: 'Target URL',
		selector: 'target_url',
		cell: (row) => (
			<div>
				<div style={{ fontWeight: 700 }}>
					<a href={row.target_url} target="_blank">
						{row.target_url}
					</a>
				</div>
			</div>
		),
		sortable: false,
	},
];

const Clicks = (props) => {
	const { clicks } = props.clicks;
	useEffect(() => {
		const currentDate = new Date();
		let pastDate = new Date();
		pastDate = pastDate.setDate(currentDate.getDate() - 30);
		if (!clicks) {
			props.fetch_clicks_data({ from: formatDate(new Date(pastDate), 'yyyy-mm-dd'), to: formatDate(currentDate, 'yyyy-mm-dd') });
		}
	}, []);

	const analyticsData = (data) => {
		let results = {};
		data.forEach((element) => {
			let date = element.created_at.split(' ')[0];
			if (results.hasOwnProperty(date)) {
				results[date] = results[date] + 1;
			} else {
				results[date] = 1;
			}
		});
		return results;
	};
	const buildData = (data) => {
		return data.reduce((acc, curVal) => acc.concat(parseInt(curVal.IPCOUNT)), []);
	};

	return (
		<React.Fragment>
			<Topbar />
			<h3 className="btl-analytics-heading">{__('Analytics', 'betterlinks')}</h3>
			<div className="btl-analytic">
				{clicks ? (
					<React.Fragment>
						<Analytics data={analyticsData(clicks)} />
						<div className="btl-analytic-table-wrapper">
							<DataTable className="btl-analytic-table" title={__('All Clicks', 'betterlinks')} columns={columns} data={clicks} />
						</div>
					</React.Fragment>
				) : (
					<TableLoader />
				)}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Clicks);
