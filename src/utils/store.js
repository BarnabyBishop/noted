import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import reduxLogger from '../middleware/redux-logger';
import saveListItem from '../middleware/save-list-item';
import getList from '../middleware/get-list';
import getTags from '../middleware/get-tags';
import login from '../middleware/login';
import authToken from '../middleware/auth-token';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    {}, // no initial state
    composeEnhancers(applyMiddleware(reduxLogger, login, authToken, getList, getTags, saveListItem))
);

export default store;
