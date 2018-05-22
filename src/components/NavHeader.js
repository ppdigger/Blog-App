import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Write from '../pages/Write';

const deviceW = Dimensions.get('window').width;
const padding = 20;

const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      isOpen: false
    };
  }
  componentDidMount() {
    this.setState({
      title: this.props.title
    });
  }
  _backPage() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }
  _write() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        title: 'Write',
        component: Write
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={this.state.hidden}
          showHideTransition="slide"
        />
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={this._backPage.bind(this)}>
            <Icon style={styles.more} name="reply" size={px2dp(22)} color="#666"/>
          </TouchableOpacity>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableOpacity onPress={this._write.bind(this)}>
            <Icon style={styles.more} name="edit" size={px2dp(22)} color="#666"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  navHeader: {
    width: deviceW,
    flexDirection: 'row',
    paddingLeft: padding,
    paddingRight: padding,
    backgroundColor: '#f4f4f4',
  },
  back: {
    flex: 2,
    fontSize: 16,
    lineHeight: 46,
    textAlign: 'left',
  },
  title: {
    flex: 8,
    fontSize: 16,
    lineHeight: 46,
    textAlign: 'center',
  },
  more: {
    flex: 2,
    fontSize: 16,
    lineHeight: 46,
    textAlign: 'right',
  },
});
