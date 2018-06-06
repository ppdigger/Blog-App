import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ImagePicker from 'react-native-image-crop-picker';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import BackBtn from '../components/navbar/BackBtn';
import ReleaseBtn from '../components/navbar/ReleaseBtn';

export default class Write extends Component {
  constructor(props) {
    super(props);
  }
  _onPressAddImage = () => {
    
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
        statusBar={{style: 'light-content', tintColor: '#2abf88'}}
        style={{borderBottomWidth: 0.5, backgroundColor: '#2abf88', paddingLeft: 20, paddingRight: 20}}
        title={{title: '写博客', tintColor: '#fff'}}
        leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}
        rightButton={<ReleaseBtn onPress={()=>{}}/>}/>
        <View style={styles.richTextEditor}>
          <RichTextEditor
            ref={(r) => this.richtext = r}
            initialTitleHTML={''}
            initialContentHTML={''}
            editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <RichTextToolbar
            onPressAddImage={() => this._onPressAddImage()}
          	getEditor={() => this.richtext}
          />
        </View>
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
  }
});
