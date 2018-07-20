import React from 'react';
import PropTypes from 'prop-types';

const ReactLoadable = ({ chunks }) =>
  chunks.map((chunk) => (
    <script
      key={chunk.file}
      crossOrigin="anonymous"
      type="text/javascript"
      src={chunk.file}
    />
  ));

ReactLoadable.propTypes = {
  chunks: PropTypes.arrayOf(PropTypes.shape),
};

ReactLoadable.defaultProps = {
  chunks: [],
};

export default ReactLoadable;
