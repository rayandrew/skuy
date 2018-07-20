/**
 * Inspired by After.js by Jared Palmer
 * https://github.com/jaredpalmer/after.js
 *
 * MIT License
 * With some changes by Ray Andrew (@rayandrews) <raydreww@gmail.com>
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import Helmet from 'react-helmet';

import { isPromise, initRedirect } from '../core/utils';

import getOptions from '../core/getOptions';
import loadInitialProps from '../core/loadInitialProps';

import Skuy from '../core/Skuy';

export default async function render(App, routerContext, _options) {
  const options = getOptions(_options);
  const {
    req,
    res,
    assets,
    document: Doc,
    customRenderer,
    staticMethod,
    ...rest
  } = options;

  /**
   * since app is used twice,
   * we define it in const and refer it in both,
   * saving repeated rendering computation in the process.
   */
  const app = <App />;

  const RouteComponent = (
    <StaticRouter context={{}} location={req.url}>
      {app}
    </StaticRouter>
  );

  const data = await loadInitialProps(RouteComponent, {
    req,
    res,
    redirect: initRedirect(res),
    staticMethod,
    ...rest,
  });

  const renderPage = async (fn = (Page) => (props) => <Page {...props} />) => {
    const defaultRenderer = (node) => ({
      html: ReactDOMServer.renderToString(node),
    });

    const renderer = customRenderer || defaultRenderer;

    const asyncOrSyncRender = renderer(
      <StaticRouter context={routerContext} location={req.url}>
        {fn(Skuy)({ data, component: () => app, options })}
      </StaticRouter>
    );

    const renderedContent = isPromise(asyncOrSyncRender)
      ? await asyncOrSyncRender
      : asyncOrSyncRender;

    const helmet = Helmet.renderStatic();

    return {
      helmet,
      ...renderedContent,
    };
  };

  const { html, ...docProps } = await Doc[staticMethod]({
    req,
    res,
    assets,
    redirect: initRedirect(res),
    renderPage,
    data,
  });

  const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);

  return `<!doctype html>${doc.replace(
    'DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP',
    html
  )}`;
}
