export const isFunction = (obj) => typeof obj === 'function';

export const isObject = (obj) => obj !== null && typeof obj === 'object';

export const isPromise = (value) => isObject(value) && isFunction(value.then);

export const isSwitch = (el) => el.type && el.type.name === 'Switch';

export const isWrapped = (el) => el.WrappedComponent;

export const isLoadableComponent = (el) => el.type && isFunction(el.type.load);

export const isReactLoadable = (el) => el.type && isFunction(el.type.preload);

export const isLoadable = (el, method) =>
  el.type && typeof el.type[method] === 'function';

export const isStaticMethodLoadable = (el, method) =>
  el && typeof el[method] === 'function';

export const isServer =
  Object.prototype.toString.call(
    typeof process !== 'undefined' ? process : 0
  ) === '[object process]';

export const initRedirect = (res) => (location) => {
  if (isServer) {
    res.writeHead(302, { Location: location });
    res.end();
  } else {
    window.location.replace(location);
  }
};
