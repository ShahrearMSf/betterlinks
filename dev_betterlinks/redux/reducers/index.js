import { combineReducers } from 'redux';
import activity from 'redux/reducers/activity.reducers';
import settings from 'redux/reducers/settings.reducers';
import links from 'redux/reducers/links.reducers';
import terms from 'redux/reducers/terms.reducers';
import clicks from 'redux/reducers/clicks.reducers';
import keywords from 'redux/reducers/keywords.reducers';
import postdatas from 'redux/reducers/posttypesdata.reducers';
import favouriteSort from 'redux/reducers/favouritesort.reducers';
import autoLinkSettings from './autolinksettings.reducers';
import password from './password.reducers';
import analytics from './analytics.reducers';
import metaTags from './metaTags.reducers';
import quickSetup from './quick-setup.reducers';
import aiBulkLinks from './ai_bulk_links.reducers';

export default combineReducers({ activity, settings, links, terms, clicks, keywords, postdatas, favouriteSort, autoLinkSettings, password, analytics, metaTags, quickSetup, aiBulkLinks });
