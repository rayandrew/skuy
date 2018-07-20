import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { renderToStaticMarkup } from 'react-dom/server';

import { SkuyRoot, SkuyData, ReactLoadable } from 'skuy/document';

import serialize from 'serialize-javascript';

/* eslint-disable */

export default class CustomDocument extends Component {
  static async fetchData({ assets, data, renderPage }) {
    const page = await renderPage();

    AppRegistry.registerComponent('SkuyRoot', () => SkuyRoot);
    const { getStyleElement } = AppRegistry.getApplication('SkuyRoot', {});

    const rnwCss = renderToStaticMarkup(getStyleElement());

    return { assets, data, rnwCss, ...page };
  }

  render() {
    const {
      rootId,
      dataId,
      helmet,
      chunks,
      assets,
      data,
      rnwCss,
      store,
    } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html lang="en" {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          <style
            id="react-native-stylesheet"
            dangerouslySetInnerHTML={{
              __html: rnwCss
                .replace(/<\/style>/g, '')
                .replace(/<style id="react-native-stylesheet">/g, ''),
            }}
          />
        </head>
        <body {...bodyAttrs}>
          <SkuyRoot id={rootId} />
          <SkuyData id={dataId} data={data} />
          <script
            id="redux-state"
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ = ${serialize(
                store.getState()
              )}`,
            }}
          />
          <ReactLoadable chunks={chunks} />
          <script
            type="text/javascript"
            src={assets.client.js}
            crossOrigin="anonymous"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.main();`,
            }}
          />
        </body>
      </html>
    );
  }
}
