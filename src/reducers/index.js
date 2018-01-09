import { combineReducers } from 'redux';
import list from './list';
import app from './app';

const reducers = combineReducers({
    list,
    app
});

export default reducers;
