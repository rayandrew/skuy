import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import routes from './routes';

const App = () => (
  <Switch>
    {routes.map((route) => <Route key={route.path} {...route} />)}
  </Switch>
);

export default App;
