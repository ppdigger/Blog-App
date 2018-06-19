import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal
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

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingHide: false
    }
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
    console.log('title', title);
    console.log('content', content);
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
  render() {
    return (
      <View style={styles.container}>
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
  },
  richTextEditor: {
    flex: 1,
    paddingTop: 20,
  },
});
