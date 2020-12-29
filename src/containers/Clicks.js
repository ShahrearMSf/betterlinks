import React, { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import DataTable from 'react-data-table-component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TableLoader from '../components/Loader/TableLoader'
import { site_url } from './../utils/helper'
import { fetch_clicks_data } from './../redux/actions/clicks.actions'

const columns = [
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
        name: 'Short URI',
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
        name: 'Target Link',
        selector: 'target_url',
        cell: (row) => (
            <div>
                <div style={{ fontWeight: 700 }}>
                    <a href={row.target_url} target='_blank'>
                        {row.target_url}
                    </a>
                </div>
            </div>
        ),
        sortable: false,
    },
]

const Clicks = (props) => {
    const { clicks } = props.clicks
    useEffect(() => {
        if (!clicks) {
            props.fetch_clicks_data()
        }
    }, [])

    return (
        <React.Fragment>
            {clicks ? (
                <DataTable
                    title={__('Clicks', 'betterlinks')}
                    columns={columns}
                    data={clicks}
                />
            ) : (
                <TableLoader />
            )}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    clicks: state.clicks,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clicks)
