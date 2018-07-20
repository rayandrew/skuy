/**
 * Inspired by Rogue.js by Alid Castano
 * https://github.com/alidcastano/rogue.js
 *
 * MIT License
 * With some changes by Ray Andrew (@rayandrews) <raydreww@gmail.com>
 */

import walkTree from 'react-tree-walker';

import {
  isWrapped,
  isLoadableComponent,
  isLoadable,
  isReactLoadable,
  isStaticMethodLoadable,
} from './utils';

export default async function loadInitialProps(App, ctx) {
  const parentWhitelist = [
    'StaticRouter',
    'BrowserRouter',
    'Route',
    'Switch',
    'Skuy',
  ];

  let props = {};
  async function getInitialProps(component) {
    const compProps = await component[ctx.staticMethod](ctx);

    if (compProps) props = Object.assign({}, props, compProps);
  }

  await walkTree(App, async (element) => {
    if (
      element &&
      element.type &&
      parentWhitelist.indexOf(element.type.name) > -1
    )
      return true;

    // if loadable components, load first
    if (isLoadableComponent(element)) {
      const loadedComponent = await element.type.load();

      if (isWrapped(loadedComponent)) {
        if (isStaticMethodLoadable(loadedComponent, ctx.staticMethod)) {
          await getInitialProps(loadedComponent);
        }
      } else if (isLoadable(loadedComponent, ctx.staticMethod)) {
        await getInitialProps(loadedComponent);
      }

      return false;
    }

    // if react loadable, preload first
    if (isReactLoadable(element)) {
      const loadedComponent = await element.type.preload();

      if (isStaticMethodLoadable(loadedComponent.default, ctx.staticMethod)) {
        await getInitialProps(loadedComponent.default);
      }
      return false;
    }

    if (isLoadable(element, ctx.staticMethod)) {
      await getInitialProps(element.type);
      return false;
    }

    return true;
  });

  return props;
}
