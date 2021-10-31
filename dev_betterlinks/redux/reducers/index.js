import { combineReducers } from 'redux';
import activity from './activity.reducers';
import settings from './settings.reducers';
import links from './links.reducers';
import terms from './terms.reducers';
import clicks from './clicks.reducers';
import keywords from './keywords.reducers';

export default combineReducers({ activity, settings, links, terms, clicks, keywords });
