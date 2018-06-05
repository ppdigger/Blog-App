import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import HomeList from '../components/home/HomeList';
import SearchBtn from '../components/navbar/SearchBtn';
import Search from '../pages/Search';

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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
