import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import URLConf from '../../config/URLConf';
import Article from '../../pages/Article';

const padding = 20;

export default class HomeCell extends Component {
  constructor(props) {
    super(props);
  }
  _openPage() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        title: 'Article',
        component: Article,
        params: {
          id: this.props.dataSource.id
        }
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openPage.bind(this)}>
          <Text style={styles.title} numberOfLines={2}>{this.props.dataSource.title}</Text>
          <Text style={styles.summary} numberOfLines={2}>{this.props.dataSource.summary}</Text>
          <View style={styles.header}>
            <Image
              source={{uri:this.props.dataSource.avatar}}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{this.props.dataSource.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 8,
    padding: padding,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode:'cover'
  },
  userName: {
    flex: 1,
    fontSize: 12,
    lineHeight: 20,
    paddingLeft: 8,
    color: '#00B5AD',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 6,
  },
  summary: {
    fontSize: 14,
    lineHeight: 22,
    paddingBottom: 10,
    color: '#888'
  },
});
