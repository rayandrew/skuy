import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Capture } from 'react-loadable';

/* eslint-disable */
const AppWrapper = ({ store, context, url, modules, Component }) => () => (
  <Capture report={(moduleName) => modules.push(moduleName)}>
    <Provider store={store}>
      <StaticRouter context={context} location={url}>
        <Component />
      </StaticRouter>
    </Provider>
  </Capture>
);

export default AppWrapper;
