/**
 * Inspired by After.js by Jared Palmer
 * https://github.com/jaredpalmer/after.js
 *
 * MIT License
 * With some changes by Ray Andrew (@rayandrews) <raydreww@gmail.com>
 */

import React, { createElement } from 'react';
import withRouter from 'react-router-dom/withRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import PropTypes from 'prop-types';

import loadInitialProps from './loadInitialProps';
import getOptions from './getOptions';
import { Provider } from './context';

class Skuy extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    data: PropTypes.shape({}).isRequired,
    options: PropTypes.shape({}),
  };

  static defaultProps = {
    options: getOptions(),
  };

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      previousLocation: null,
      loading: false,
      prefetch: this.prefetch.bind(this),
      error: false,
    };

    this.prefetcherCache = {};

    this.contextRoute = {};
  }

  async componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location;

    if (navigated) {
      window.scrollTo(0, 0);

      this.setState({
        previousLocation: this.props.location,
        data: undefined,
        loading: true,
      });

      const {
        data,
        match,
        routes,
        history,
        options,
        location,
        ...restProps
      } = nextProps;

      try {
        const dataProps = await loadInitialProps(
          createElement(
            StaticRouter,
            { context: {}, location: nextProps.location },
            createElement(this.props.component)
          ),
          {
            ...restProps,
            ...this.props.options,
            location: nextProps.location,
            history: nextProps.history,
          }
        );

        this.setState({
          previousLocation: null,
          data: dataProps,
          loading: false,
        });
      } catch (error) {
        this.setState({
          data: null,
          loading: false,
          error: true,
        });
      }
    }
  }

  async prefetch(pathname) {
    const { data, options, ...rest } = this.props;
    const dataProps = await loadInitialProps(
      createElement(
        StaticRouter,
        { context: {}, location: pathname },
        createElement(this.props.component)
      ),
      {
        history: this.props.history,
        ...options,
        ...rest,
      }
    );

    this.prefetcherCache = Object.assign({}, this.prefetcherCache, {
      [pathname]: dataProps,
    });
  }

  render() {
    const { previousLocation, data } = this.state;
    const { location, component: RenderComponent, ...rest } = this.props;
    const initialData = this.prefetcherCache[location.pathname] || data;

    return (
      <Provider value={this.state}>
        <RenderComponent
          {...rest}
          data={initialData}
          location={previousLocation || location}
          prefetch={this.prefetch}
        />
      </Provider>
    );
  }
}

export default withRouter(Skuy);
