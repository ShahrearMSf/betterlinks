import { combineReducers } from 'redux'
import settings from './settings.reducers'
import terms from './terms.reducers'

export default combineReducers({ settings, terms })
