import React from 'react';
import { View, Text } from 'react-native';

import { skuyHoc } from 'skuy/core';

class About extends React.Component {
  static async fetchData(ctx) {
    console.log(ctx);
    return { about: 'more stuffs' };
  }

  render() {
    return (
      <View>
        <Text>about : {this.props.data && this.props.data.about}</Text>
      </View>
    );
  }
}

export default skuyHoc({})(About);
