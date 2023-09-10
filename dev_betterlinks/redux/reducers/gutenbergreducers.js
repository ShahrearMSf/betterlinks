import { combineReducers } from 'redux';
import settings from 'redux/reducers/settings.reducers';
import links from 'redux/reducers/links.reducers';
import gutenbergredirectlink from 'redux/reducers/gutenbergredirectlink.reducers';
import terms from 'redux/reducers/terms.reducers';
import gutenbergAutoLink from './gutenbergAutoLink.reducers';
import gutenbergAffiliate from 'redux/reducers/gutenbergAffiliate.reducers.js';
import autoLinkSettings from './autolinksettings.reducers';

export const gutenbergReducers = combineReducers({
	links,
	settings,
	terms,
	gutenbergredirectlink,
	gutenbergAutoLink,
	gutenbergAffiliate,
	autoLinkSettings,
});
