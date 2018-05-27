import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import BackBtn from '../components/navbar/BackBtn';

const deviceW = Dimensions.get('window').width;
const padding = 20;

const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      page: 0,
      rowNum: 8
    };
  }
  _backPage() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }
  _onSubmitEditing(e) {
    let value = e.nativeEvent.text
    // getDataSource(value)
  }
  /* 获取数据 */
  getDataSource = (value) => {
    axios.get(URLConf.API_BASE + 'search', {
      params: {
        value: value,
        page: this.state.page,
        rowNum: this.state.rowNum
      }
    })
    .then((response) => {

    })
    .catch((error) => {
      console.log('error', error);
    });
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
            <Icon style={styles.back} name="reply" size={px2dp(22)} color="#666"/>
          </TouchableOpacity>
          <TextInput style={styles.inputText}
            underlineColorAndroid='transparent'
            placeholder='搜索文章'
            clearButtonMode="while-editing"
            onSubmitEditing={this._onSubmitEditing}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  inputText: {
    flex: 10,
    fontSize: 16,
    lineHeight: 46,
    height: 46,
    paddingLeft: 20
  },
});
