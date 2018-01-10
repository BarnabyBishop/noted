import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import reducer from './reducers';
import reduxLogger from './middleware/redux-logger';
import saveListItem from './middleware/save-list-item';
import { getList } from './service';
import './index.css';

const init = async () => {
    const initialState = await getList();
    const store = createStore(
        reducer,
        initialState, // eslint-disable-line
        applyMiddleware(reduxLogger, saveListItem)
    );

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

init();
