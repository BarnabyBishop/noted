import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import reducer from './reducers';
import reduxLogger from './middleware/redux-logger';
import saveListItem from './middleware/save-list-item';
import getList from './middleware/get-list';
import getTags from './middleware/get-tags';
import { getList as getListAction } from './actions/list';
import './index.css';

const init = async () => {
    const store = createStore(
        reducer,
        {}, // no initial state
        applyMiddleware(reduxLogger, getList, getTags, saveListItem)
    );

    // Get initial data
    store.dispatch(getListAction());

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

init();
