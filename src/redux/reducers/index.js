import { combineReducers } from 'redux';
import settings from './settings.reducers';
import links from './links.reducers';
import terms from './terms.reducers';
import clicks from './clicks.reducers';

export default combineReducers({ settings, links, terms, clicks });
