import express from 'express';
import { render } from 'skuy/server';

import App from './App';

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
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: 'thing',
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
