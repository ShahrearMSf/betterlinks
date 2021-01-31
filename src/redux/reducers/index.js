import { combineReducers } from 'redux';
import links from './links.reducers';
import terms from './terms.reducers';
import clicks from './clicks.reducers';

export default combineReducers({ links, terms, clicks });
