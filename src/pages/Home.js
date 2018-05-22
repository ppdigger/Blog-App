import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HomeList from '../components/home/HomeList';
import Article from '../components/article/Index';
import NavHeader from '../components/NavHeader';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <NavHeader
          navigator={this.props.navigator}
          title={'首页'}
        />
        <HomeList
          navigator={this.props.navigator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
