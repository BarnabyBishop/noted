import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import reducer from './reducers';
import reduxLogger from './middleware/redux-logger';
import './index.css';

const store = createStore(
  reducer,
  applyMiddleware(reduxLogger)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
