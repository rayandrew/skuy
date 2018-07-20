import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

import { Consumer } from './context';

const skuyHoc = ({ LoadingComponent = null, ErrorComponent = null }) => (
  WrappedComponent
) => {
  const SkuyConsumer = () => (
    <Consumer>
      {(state) => {
        if (state.loading && !!LoadingComponent) {
          return <LoadingComponent />;
        }

        if (state.error && !!ErrorComponent) {
          return <ErrorComponent />;
        }

        return <WrappedComponent {...state} />;
      }}
    </Consumer>
  );

  const name = WrappedComponent.displayName || WrappedComponent.name;
  SkuyConsumer.displayName = `withSkuy(${name})`;
  SkuyConsumer.LoadingComponent = LoadingComponent;
  SkuyConsumer.ErrorComponent = ErrorComponent;

  return hoistStatics(SkuyConsumer, WrappedComponent);
};

export default skuyHoc;
