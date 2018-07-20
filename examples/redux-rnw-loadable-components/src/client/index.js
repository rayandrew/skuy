import 'cross-fetch/polyfill';
import { loadComponents } from 'loadable-components';
import { AppRegistry } from 'react-native';

import AppWrapper from './AppWrapper';

loadComponents().then(() => {
  AppRegistry.registerComponent('App', () => AppWrapper);
  AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
});

if (module.hot) {
  module.hot.accept();
}
