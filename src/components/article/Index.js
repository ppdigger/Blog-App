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
import URLConf from '../../config/URLConf';
import NavHeader from '../NavHeader';
import HTMLView from 'react-native-htmlview';

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
      this.setState({dataSource: response.data.blog[0]});
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <NavHeader
          navigator={this.props.navigator}
          title={'博客'}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <View>
              <Image source={{uri:this.state.dataSource.avatar}} style={styles.avatar}/>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{this.state.dataSource.title}</Text>
              <Text style={styles.time}>{this.state.dataSource.name}</Text>
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
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    marginTop: 2,
    fontSize: 16,
    color: '#00B5AD',
    lineHeight: 16,
  },
  time: {
    fontSize: 12,
    color: '#7B7C84',
    lineHeight: 12,
    marginTop: 7,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  }
});
