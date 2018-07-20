import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './client.css';

import { Skuy } from 'skuy/core';
import { getSsrData } from 'skuy/client';
import App from './App';

const data = getSsrData();

hydrate(
  <BrowserRouter>
    <Skuy component={App} data={data} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
