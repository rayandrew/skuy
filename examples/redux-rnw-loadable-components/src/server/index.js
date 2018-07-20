import 'cross-fetch/polyfill';

import express from 'express';
import logger from 'morgan';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import qs from 'qs';
import { render } from 'skuy/server';
import { getLoadableState } from 'loadable-components/server';

import App from 'app';
import Html from 'containers/Html';

import configureStore from 'store/configureStore';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server.use(logger('combined'));

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const routerContext = {};

    if (req.url.match(/.map$/)) return;

    try {
      const params = qs.parse(req.query);
      const counter = parseInt(params.counter, 10) || 5;
      const preloadedState = { counter };

      const store = configureStore(preloadedState);

      const customRenderer = async (node) => {
        const CustomApp = <Provider store={store}>{node}</Provider>;

        const loadableState = await getLoadableState(CustomApp);
        const loadable = loadableState.getScriptTag();

        return {
          html: renderToString(CustomApp),
          loadable,
          store,
        };
      };

      const html = await render(App, routerContext, {
        req,
        res,
        assets,
        customRenderer,
        document: Html,
        staticMethod: 'fetchData',
        customThing: 'thing',
        store,
      });

      if (routerContext.url) {
        res.redirect(301, routerContext.url);
      }

      if (res.finished) return;

      res.send(html);
    } catch (error) {
      res.status(500);
      console.log(error);
      res.send(error.stack);
    }
  });

export default server;
