import React from 'react';
import { View, Text } from 'react-native';

export default class Another extends React.Component {
  static async fetchData({ req, res, match, history, location, ...ctx }) {
    return { bla: 'bla stuffs' };
  }

  render() {
    return (
      <View>
        <Text>About</Text>
      </View>
    );
  }
}
