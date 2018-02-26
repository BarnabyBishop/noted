import { combineReducers } from 'redux';
import app from './app';
import list from './list';
import tags from './tags';

const reducers = combineReducers({
    app,
    list,
    tags
});

export default reducers;
