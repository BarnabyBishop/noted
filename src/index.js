import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import reducer from './reducers';
import reduxLogger from './middleware/redux-logger';
import saveListItem from './middleware/save-list-item';
import { getList, getTags } from './service';
import './index.css';

const init = async () => {
    const data = await Promise.all([
        getList(),
        getTags()
    ]);
    const list = data[0].list;
    const tags = data[1].tags;
    const initialState = { list, tags };

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
