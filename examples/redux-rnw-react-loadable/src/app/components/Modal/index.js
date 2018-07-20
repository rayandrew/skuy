import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Modal from 'modal-react-native-web';

Modal.setAppElement('#root');

/* eslint-disable */

export default class ModalExample extends Component {
  state = {
    visible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ visible });
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
          onShow={() => {
            alert('Modal has been opened.');
          }}
          onDismiss={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.visible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
