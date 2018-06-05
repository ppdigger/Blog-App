import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeList from '../components/home/HomeList';
import SearchBtn from '../components/navbar/SearchBtn';
import Search from '../pages/Search';
import Write from './Write';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  _search() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        title: 'Search',
        component: Search
      })
    }
  }
  _openWrite() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        title: 'Write',
        component: Write
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
        statusBar={{style: 'light-content', tintColor: '#2abf88'}}
        style={{borderBottomWidth: 0.5, backgroundColor: '#2abf88', paddingLeft: 20, paddingRight: 20}}
        title={{title: '首页', tintColor: '#fff'}}
        rightButton={<SearchBtn onPress={()=>{this._search()}}/>}/>
        <HomeList
          navigator={this.props.navigator}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="博客" onPress={this._openWrite.bind(this)}>
            <Icon name="plus" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="照片" onPress={() => {}}>
            <Icon name="plus" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="说说" onPress={() => {}}>
            <Icon name="plus" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
