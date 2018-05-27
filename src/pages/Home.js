import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
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
        style={{borderBottomWidth: 0.5, borderBottomColor: '#F3F3F3', paddingLeft: 20, paddingRight: 20}}
        title={{title: '首页'}}
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
