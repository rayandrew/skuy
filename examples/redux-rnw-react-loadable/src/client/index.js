import 'cross-fetch/polyfill';
import Loadable from 'react-loadable';
import { AppRegistry } from 'react-native';

import AppWrapper from './AppWrapper';

window.main = () => {
  Loadable.preloadReady().then(() => {
    AppRegistry.registerComponent('App', () => AppWrapper);
    AppRegistry.runApplication('App', {
      initialProps: {},
      rootTag: document.getElementById('root'),
    });
  });
};

if (module.hot) {
  module.hot.accept(() => window.main);
}
