import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Skuy } from 'skuy/core';
import { getSsrData } from 'skuy/client';

import configureStore from 'store/configureStore';
import App from 'app';

/* eslint-disable */
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
delete window.__PRELOADED_STATE__;

const data = getSsrData();
const options = {
  staticMethod: 'fetchData',
  store,
};

const AppWrapper = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Skuy component={App} data={data} options={options} />
    </BrowserRouter>
  </Provider>
);
/* eslint-enable */

export default AppWrapper;
