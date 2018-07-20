import React from 'react';
import { Link } from 'react-router-dom';

import { View, Text } from 'react-native';

class Home extends React.Component {
  static async fetchData({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'more stuffs' };
  }

  render() {
    return (
      <View>
        <View>
          <Text>
            To get started, edit src/App.js or src/Home.js and save to reload.
          </Text>
        </View>

        <View>
          <Link to="/about">About</Link>
        </View>
      </View>
    );
  }
}

export default Home;
