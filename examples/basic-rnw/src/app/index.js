import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import About from './About';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

export default App;
