import React from 'react';

import { skuyHoc } from 'skuy/core';

/* eslint-disable */

class About extends React.Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    console.log('hello from about');
    return { stuff: 'more stuffs' };
  }

  render() {
    return this.props.data.stuff ? (
      <div>about : {JSON.stringify(this.props.data, null, 2)}</div>
    ) : null;
  }
}

export default skuyHoc({
  LoadingComponent: () => <div>Loading...</div>,
})(About);
