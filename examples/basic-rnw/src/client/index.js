import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRegistry } from 'react-native';

import { Skuy } from 'skuy/core';
import { getSsrData } from 'skuy/client';

import App from '../app';

const data = getSsrData();
const options = {
  staticMethod: 'fetchData',
};

const AppWrapper = () => (
  <BrowserRouter>
    <Skuy component={App} data={data} options={options} />
  </BrowserRouter>
);

AppRegistry.registerComponent('App', () => AppWrapper);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

if (module.hot) {
  module.hot.accept();
}
