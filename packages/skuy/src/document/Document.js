/* eslint-disable */

import React from 'react';

import SkuyRoot from './SkuyRoot';
import SkuyData from './SkuyData';

export default class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();

    return { assets, data, ...page };
  }

  render() {
    const { rootId, dataId, helmet, assets, data } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
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
        </head>
        <body {...bodyAttrs}>
          <SkuyRoot id={rootId} />
          <SkuyData id={dataId} data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

/* eslint-enable */
