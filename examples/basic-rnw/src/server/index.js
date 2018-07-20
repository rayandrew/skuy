import express from 'express';

import { render } from 'skuy/server';

import Html from '../app/Html';

import App from '../app';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const routerContext = {};

    if (req.url.match(/.map$/)) return;

    try {
      const html = await render(App, routerContext, {
        req,
        res,
        assets,
        document: Html,
        staticMethod: 'fetchData',
        customThing: 'thing',
      });

      if (routerContext.url) {
        res.redirect(301, routerContext.url);
      }

      if (res.finished) return;

      res.send(html);
    } catch (error) {
      res.status(500);
      res.send(error.stack);
    }
  });

export default server;
