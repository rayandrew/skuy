import React from 'react';
import PropTypes from 'prop-types';

const LoadableComponents = ({ loadable }) => (
  <script
    id="loadable-components"
    type="text/javascript"
    // eslint-disable-next-line
    dangerouslySetInnerHTML={{
      __html: loadable.replace(/<\/script>/g, '').replace(/<script>/g, ''),
    }}
  />
);

LoadableComponents.propTypes = {
  loadable: PropTypes.any,
};

LoadableComponents.defaultProps = {
  loadable: '',
};

export default LoadableComponents;
