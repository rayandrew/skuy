import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
  const middlewareDevs = __DEVELOPMENT__ && __CLIENT__ ? [logger] : [];
  const middlewares = [thunk, ...middlewareDevs];

  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable  */
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    __DEVELOPMENT__ &&
    __DEVTOOLS__ &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;

  const store = createStore(
    rootReducer(),
    preloadedState,
    composeEnhancers(...enhancers)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  /* eslint-enable */

  return store;
};

export default configureStore;
