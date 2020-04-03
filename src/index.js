import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app';
import { setTag, setAuthToken } from './actions/app';
import { getTags as getTagsAction } from './actions/tags';
import { getAuthStorage } from './utils/local-storage';
import store from './utils/store';
import './index.css';

const init = async () => {
    // Get initial data
    store.dispatch(setAuthToken(getAuthStorage()));
    store.dispatch(getTagsAction({ initial: true }));

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

init();
