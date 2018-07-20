import React from 'react';
import PropTypes from 'prop-types';

import { rootId } from '../core/constants';

const SkuyRoot = ({ id }) => (
  <div id={id}>DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP</div>
);

SkuyRoot.propTypes = {
  id: PropTypes.string,
};

SkuyRoot.defaultProps = {
  id: rootId,
};

export default SkuyRoot;
