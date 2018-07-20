import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AboutBase from './AboutBase';
import Another from './Another';

class About extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/about" component={AboutBase} />
        <Route exact path="/about/:wew" component={Another} />
      </Switch>
    );
  }
}

export default About;
