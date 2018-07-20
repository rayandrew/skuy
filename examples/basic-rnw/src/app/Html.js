import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { renderToStaticMarkup } from 'react-dom/server';

import { SkuyRoot, SkuyData } from 'skuy/document';

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
    const { rootId, dataId, assets, data, rnwCss } = this.props;

    return (
      <html lang="en">
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <body>
          <SkuyRoot id={rootId} />
          <SkuyData id={dataId} data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}
