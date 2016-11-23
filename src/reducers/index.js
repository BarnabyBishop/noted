import { combineReducers } from 'redux';
import list from './list';
import date from './date';

const reducers = combineReducers({
  list,
  date
})

export default reducers
