import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Platform,
  PixelRatio,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import URLConf from '../config/URLConf';
import NavigationBar from 'react-native-navbar';
import Loading from '../components/Loading';
import Toast, {DURATION} from 'react-native-easy-toast';
import Register from './Register';
import CloseBtn from '../components/navbar/CloseBtn';

const PlatformIOS = Platform.OS === 'ios';
const deviceW = Dimensions.get('window').width;
const padding = 20;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingHide: false,
      account: '',
      password: '',
      modalVisible: true,
      loginRegPageVisible: false,
    };
  }
  trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g,"");
  }
  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
  // 打开注册 modal
  _openRegister = () => {
    this.setState({
      loginRegPageVisible: true,
    });
  }
  _login = () => {
    let account = this.trim(this.state.account),
        password = this.trim(this.state.password);
    if (account == '' || account.length == 0) {
      Alert.alert('请填写账号');
      return;
    }
    if (password == '' || password.length == 0) {
      Alert.alert('请填写密码');
      return;
    }
    this.login(account, password);
  }
  /* 登录请求 */
  login = (account, password) => {
    let _this = this;
    this.showModal();
    axios.post(URLConf.API_BASE + 'login', {
      account: account,
      password: password
    })
    .then((response) => {
      this.hideModal();
      if(response.data.success) {
        console.log(response);
        let user = response.data.result;
        AsyncStorage.multiSet([
          ['token', user.token],
          ['userId', user.id.toString()],
          ['userName', user.name],
          ['avatar', user.avatar]
        ], () => {
          console.log('star');
          this.props.refresh(true, user.token);
          setTimeout(() => {
            this.props.hideLoginRegPage();
          }, 600);
        });
      } else {

      }
      this.refs.toast.show(response.data.toast);
    })
    .catch((error) => {
      console.log('error', error);
      this.hideModal();
    });
  }
  /* 显示 加载Modal */
  showModal() {
    this.setState({
      loadingHide: true
    })
  }
  /* 隐藏 加载Modal */
  hideModal() {
    this.setState({
      loadingHide: false
    });
  }
  hideLoginRegPage = () => {
    this.setState({
      loginRegPageVisible: false,
    });
  }
  render() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.modalVisible}
        onRequestClose={() => {this._setModalVisible(false)}}
        >
        <View style={styles.container}>
          {this.state.loginRegPageVisible && <Register hideLoginRegPage={this.hideLoginRegPage}/>}
          <NavigationBar
            statusBar={{style: 'light-content', tintColor: '#ffffff'}}
            style={{backgroundColor: '#ffffff', paddingLeft: 20, paddingRight: 20}}
            leftButton={<CloseBtn onPress={()=>this.props.hideLoginRegPage()}/>}
          />
          <ScrollView style={styles.scrollView}>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="账号"
                placeholderTextColor="#acacac"
                maxLength={20}
                value={this.state.account}
                onChangeText={(value) => this.setState({account: value})}
              />
              <TextInput
                style={styles.input}
                placeholder="密码"
                placeholderTextColor="#acacac"
                secureTextEntry={true}
                maxLength={20}
                value={this.state.password}
                onChangeText={(value) => this.setState({password: value})}
              />
              <View style={styles.button}>
                <Button
                  onPress={() => {this._login()}}
                  title="登 录"
                  color="#ffffff"
                  accessibilityLabel="Login"
                />
              </View>
              <View>
                <TouchableOpacity onPress={this._openRegister}>
                  <Text style={styles.toggle}>注册</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Loading
              loadingHide={this.state.loadingHide}
              type={'Wave'}
              size={30}
              hideModal={() => this.hideModal()}
          />
          <Toast
            ref='toast'
            position='center'
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    width: deviceW,
    paddingTop: 8,
    paddingBottom: 20,
  },
  inputs: {
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: 40,
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
    height: 33,
    borderColor: '#cecece',
    borderBottomWidth: PlatformIOS ? 1 / PixelRatio.get() : 0,
    borderRadius: 4,
    color: '#333333',
    marginBottom: 24,
    padding: 6,
  },
  button: {
    backgroundColor: '#2abf88',
    borderWidth: PlatformIOS ? 1 / PixelRatio.get() : 0,
    borderColor: '#cecece',
  },
  toggle: {
    fontSize: 16,
    color: '#888',
    paddingTop: 10,
  },
});
