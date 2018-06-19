import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal
} from 'react-native';
import Spinner from 'react-native-spinkit';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Modal
        style={styles.modal}
        animationType='fade'
        transparent={true}
        visible={this.props.loadingHide}
        onRequestClose={() => {this.props.hideModal()}}>
        <Spinner
          style={styles.spinner}
          isVisible={this.props.loadingHide}
          size={this.props.size}
          type={this.props.type}
        />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: deviceW,
    height: deviceH,
  },
  spinner: {
    marginLeft: (deviceW-30)/2,
    marginTop: (deviceH-30)/2,
    color: '#2abf88',
  }
});
