import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import reduxLogger from '../middleware/redux-logger';
import saveListItem from '../middleware/save-list-item';
import getList from '../middleware/get-list';
import getTags from '../middleware/get-tags';
import login from '../middleware/login';

const store = createStore(
    reducer,
    {}, // no initial state
    applyMiddleware(reduxLogger, getList, getTags, login, saveListItem)
);

export default store;
