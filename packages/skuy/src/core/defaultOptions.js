import { Document } from '../document';

import { isServer } from './utils';

import { staticMethod, rootId, dataId } from './constants';

export default {
  document: Document,
  staticMethod,
  rootId,
  dataId,
  isServer,
};
