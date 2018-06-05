import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  View,
  Platform,
  FlatList
} from 'react-native';
import axios from 'axios';
import URLConf from '../config/URLConf';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import BackBtn from '../components/navbar/BackBtn';
import Toast, {DURATION} from 'react-native-easy-toast';
import HomeCell from '../components/home/HomeCell';

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
      hidden: false,
      page: 0,
      rowNum: 8,
      noMore: false,
      isLoadingMore: false,
      dataSource: []
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
    this.getDataSource(value)
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
      if(response.data.blog.length < this.state.rowNum) {
        this.setState({
          noMore: true
        })
      }
      let data = response.data.blog
      if (data.length == 0) {
        this.refs.toast.show('搜索不到你想要的')
      }
      data = [...this.state.dataSource, ...data]
      this.setState({
        isLoadingMore: false,
        dataSource: data,
        page: this.state.page+1
      })
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  _renderItem = ({item}) => {
    console.log(item)
    return <HomeCell
             dataSource={item}
             navigator={this.props.navigator}
           />
  }
  extraUniqueKey(item, index){
    return index+item;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={this.state.hidden}
          showHideTransition="slide"
        />
        <View style={styles.navHeader}>
          <BackBtn onPress={()=>{this._backPage()}}/>
          <TextInput style={styles.inputText}
            underlineColorAndroid='transparent'
            placeholder='搜索文章'
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            clearButtonMode='while-editing'
            maxLength = {40}
            selectionColor='rgba(255, 255, 255, 0.8)'
            onSubmitEditing={this._onSubmitEditing.bind(this)}/>
        </View>
        <View style = {styles.container}>
          <FlatList
            renderItem={this._renderItem}
            data={this.state.dataSource}
            keyExtractor={this.extraUniqueKey}
            style={styles.flatList}
          />
          <Toast
            ref='toast'
            position='center'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  navHeader: {
    width: deviceW,
    flexDirection: 'row',
    paddingLeft: padding,
    paddingRight: padding,
    backgroundColor: '#2abf88',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
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
    paddingLeft: 20,
    color: '#fff'
  },
  flatList: {
    width: deviceW,
  }
});
