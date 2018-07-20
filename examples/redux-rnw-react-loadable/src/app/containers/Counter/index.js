import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Counter, Loading } from 'components';
import { skuyHoc } from 'skuy/core';

import * as CounterActions from 'actions/counter';
import { getCounter } from 'selectors/counter';

const CounterWrapped = connect(
  (state) => ({
    counter: getCounter(state),
  }),
  (dispatch) => bindActionCreators(CounterActions, dispatch)
)(Counter);

CounterWrapped.fetchData = async ({ store }) => {
  const promises = [];

  promises.push(store.dispatch(CounterActions.getCounter()));
  await Promise.all(promises);

  return { hello: 'world' };
};

export default skuyHoc({
  LoadingComponent: Loading,
})(CounterWrapped);
