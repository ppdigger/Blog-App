import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TextInput,
  Platform,
  PixelRatio
} from 'react-native';
import axios from 'axios';
import URLConf from '../config/URLConf';
import NavigationBar from 'react-native-navbar';
import ImagePicker from 'react-native-image-picker';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import Qiniu,{Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';
import BackBtn from '../components/navbar/BackBtn';
import ReleaseBtn from '../components/navbar/ReleaseBtn';
import Loading from '../components/Loading';
import Toast, {DURATION} from 'react-native-easy-toast';
import Spinner from 'react-native-spinkit';
import {
  getToken,
  outLogin
} from '../tools/secret';
import Login from './Login';

const PlatformIOS = Platform.OS === 'ios';
const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;
const padding = 20;

export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingHide: false,
      summary: '',
      token: '',
      loginRegPageVisible: false,
    }
  }
  componentDidMount() {
    getToken((token) => {
      this.setState({
        token: token
      });
    });
  }
  _onPressAddImage = () => {
    let _this = this;
    let options = {
      title: '选择图片',
      mediaType: 'photo',
      quality: 0.3,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, async (response)  => {
      _this.showModal();
      let qiniuToken = await getQiniuToken();
      let formInput = {};
      Rpc.uploadFile(response.uri, qiniuToken, formInput)
      .then((res) => {
        if (res.response != null) {
          let src = 'http://p9zh92g17.bkt.clouddn.com/' + JSON.parse(res.response).key;
          console.log('插入图片', src);
          _this.richtext.insertImage({src: src, width:200, height:200});
          _this.hideModal();
        } else {
          _this.refs.toast.show(res);
          _this.hideModal();
        }
      });
    });
    /* 获取七牛token */
    getQiniuToken = async () => {
      let res = await axios.get(URLConf.API_BASE + 'qiniuToken')
        .then((response) => {
          return response.data.uploadToken
        })
        .catch((error) => {
          console.log('error', error);
        })
      return res;
    }
  }
  /* 发布 */
  _releaseArticle = async () => {
    let title = await this.richtext.getTitleHtml(),
        content = await this.richtext.getContentHtml();
    if(title.trim() == '' || content.trim() == '') {
      this.refs.toast.show('标题和内容不能为空！');
    } else {
      this.releaseArticle(title, content, this.state.summary);
    }
  }
  /* 发布 axios */
  releaseArticle = (title, content, summary) => {
    this.showModal();
    axios.post(URLConf.API_BASE + 'releaseBlog', {
      title: title,
      content: content,
      summary: summary
    }, {
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
      }
    })
    .then((response) => {
      this.hideModal();
      if(response.data.success) {
        setTimeout(() => {
          this.props.navigator.pop();
        }, 800);
      }
      setTimeout(() => {
        this.refs.toast.show(response.data.toast);
      }, 600);
    })
    .catch((error) => {
      if (error.response.status == 401) {
        this.refs.toast.show('请重新登录');
        outLogin();
        setTimeout(() => {
          this._openLogin();
        }, 600);
      }
      console.log('error', error);
      this.hideModal();
    });
  }
  _openLogin = () => {
    console.log(this);
    this.setState({
      loginRegPageVisible: true,
    });
  }
  hideLoginRegPage = () => {
    this.setState({
      loginRegPageVisible: false,
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
  refresh = (isLogin, token) => {
    this.setState({
      token: token
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loginRegPageVisible && <Login hideLoginRegPage={this.hideLoginRegPage} refresh={this.refresh}/>}
        <NavigationBar
          statusBar={{style: 'light-content', tintColor: '#2abf88'}}
          style={{borderBottomWidth: 0.5, backgroundColor: '#2abf88', paddingLeft: 20, paddingRight: 20}}
          title={{title: '写博客', tintColor: '#fff'}}
          leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}
          rightButton={<ReleaseBtn onPress={()=>this._releaseArticle()}/>}
        />
        <View style={styles.richTextEditor}>
          <RichTextEditor
            ref={(r) => this.richtext = r}
            titlePlaceholder={'请输入标题'}
            contentPlaceholder={'请输入正文'}
            editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <View style={styles.summary}>
            <TextInput style={styles.inputText}
              underlineColorAndroid='transparent'
              placeholder='摘要（选填）'
              placeholderTextColor='rgba(74, 74, 74, 0.2)'
              maxLength = {120}
              onChangeText={(text) => this.setState({summary: text})}
              value={this.state.summary}
              selectionColor='rgba(0, 0, 0, 0.8)'/>
          </View>
          <RichTextToolbar
            onPressAddImage={() => this._onPressAddImage()}
          	getEditor={() => this.richtext}
          />
        </View>
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  richTextEditor: {
    flex: 1,
    paddingTop: 20,
  },
  summary: {
    paddingLeft: padding,
    paddingRight: padding,
  },
  inputText: {
    fontSize: 16,
    height: 46,
    borderTopWidth: PlatformIOS ? 1 / PixelRatio.get() : 0,
    borderColor: '#d5d5d5',
    borderStyle: 'solid',
  },
});
