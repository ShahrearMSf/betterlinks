import { combineReducers } from 'redux'
import settings from './settings.reducers'
import terms from './terms.reducers'
import clicks from './clicks.reducers'

export default combineReducers({ settings, terms, clicks })
