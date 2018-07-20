import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import { skuyHoc } from 'skuy/core';
import logo from './react.svg';

/* eslint-disable */

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'whatevs' };
  }

  render() {
    console.log(this.props.data);
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Skuy</h2>
        </div>
        <p className="Home-intro">
          To get started, edit
          <code>src/Home.js</code> or <code>src/About.js</code> and save to
          reload.
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default skuyHoc({
  LoadingComponent: () => <div>Loading...</div>,
})(Home);
