import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const deviceW = Dimensions.get('window').width;
const padding = 20;

const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class BackBtn extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        <Icon style={styles.back} name="reply" size={px2dp(22)} color="#666"/>
      </TouchableOpacity>
    )
  }
};


var styles = StyleSheet.create({
  container: {

  },
  back: {
    flex: 2,
    fontSize: 16,
    lineHeight: 46,
    textAlign: 'left',
  },
});
