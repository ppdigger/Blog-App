import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  PixelRatio,
  TouchableOpacity,
  Button,
  AsyncStorage
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Login from './Login';
import {
  getUserInfo,
  loginState,
  getToken
} from '../tools/secret';

const PlatformIOS = Platform.OS === 'ios';
const deviceW = Dimensions.get('window').width;
const padding = 20;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {
        avatar: 'http://127.0.0.1:7001/public/avatar/none.jpg',
        name: '未登录',
      },
      loginRegPageVisible: false,
      isLogin: false,
    };
  }
  componentDidMount() {
    getUserInfo(this._getUserInfo);
    loginState(flag => {
      this.setState({
        isLogin: flag
      });
    });
  }
  // 获取用户信息
  _getUserInfo = (user) => {
    if (user.avatar && user.userName) {
      this.setState({
        dataSource: {
          avatar: user.avatar,
          name: user.userName,
        }
      });
    }
  }
  _openLogin = () => {
    this.setState({
      loginRegPageVisible: true,
    });
  }
  hideLoginRegPage = () => {
    console.log('hideLoginRegPage');
    this.setState({
      loginRegPageVisible: false,
    });
  }
  // 退出登录
  _outLogin = () => {
    AsyncStorage.multiRemove([
      'token', 'userId', 'userName', 'avatar'
    ], () => {
      this.setState({
        dataSource: {
          avatar: 'http://127.0.0.1:7001/public/avatar/none.jpg',
          name: '未登录',
        },
        isLogin: false,
      });
    });
  }
  refresh = (isLogin, token) => {
    this.setState({
      isLogin: isLogin
    });
    getUserInfo(this._getUserInfo);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loginRegPageVisible && <Login hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>}
        <NavigationBar
        statusBar={{style: 'light-content', tintColor: '#2abf88'}}
        style={{borderBottomWidth: 0.5, backgroundColor: '#2abf88', paddingLeft: 20, paddingRight: 20}}
        title={{title: '我的', tintColor: '#fff'}}/>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={this._openLogin}>
            <View style={styles.header}>
              <Image
                source={{uri:this.state.dataSource.avatar}}
                style={styles.avatar}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{this.state.dataSource.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {this.state.isLogin &&
            <View style={styles.button}>
              <Button
                onPress={() => {this._outLogin()}}
                title="退出登录"
                color="#ffffff"
                accessibilityLabel="退出"
              />
            </View>}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: deviceW,
    paddingTop: 8,
    paddingBottom: 20,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: padding,
    paddingRight: padding,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  info: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 44,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2abf88',
    borderWidth: PlatformIOS ? 1 / PixelRatio.get() : 0,
    borderColor: '#cecece',
  },
});
