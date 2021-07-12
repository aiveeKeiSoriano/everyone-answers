import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterWrapper from './components/RouterWrapper';
import store from './store/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <RouterWrapper />
  </Provider>,
  document.getElementById('root')
);
