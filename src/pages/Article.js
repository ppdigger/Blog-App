import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import NavigationBar from 'react-native-navbar';
import URLConf from '../config/URLConf';
import HTMLView from 'react-native-htmlview';
import BackBtn from '../components/navbar/BackBtn';

const deviceW = Dimensions.get('window').width;
const padding = 20;

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {}
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.id
    });
    this.getDataSource();
  }
  /* 获取数据 */
  getDataSource = () => {
    axios.get(URLConf.API_BASE + 'blogOne', {
      params: {
        id: this.props.id
      }
    })
    .then((response) => {
      if(response.data.success) {
        this.setState({dataSource: response.data.result[0]});
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
        statusBar={{style: 'light-content', tintColor: '#2abf88'}}
        style={{borderBottomWidth: 0.5, backgroundColor: '#2abf88', paddingLeft: 20, paddingRight: 20}}
        title={{title: '正文', tintColor: '#fff'}}
        leftButton={<BackBtn onPress={()=>this.props.navigator.pop()}/>}/>
        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={styles.title}>{this.state.dataSource.title}</Text>
          </View>
          <View style={styles.header}>
            <View>
              <Image source={{uri:this.state.dataSource.avatar}} style={styles.avatar}/>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{this.state.dataSource.name}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <HTMLView
              value={this.state.dataSource.content}
            />
          </View>
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
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 24,
    color: '#00B5AD',
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 12,
    color: '#7B7C84',
    lineHeight: 20,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  }
});
