import React, { Component } from 'react';
import {
  StyleSheet,
  SectionList,
  Text,
  View,
  Dimensions
} from 'react-native';
import HomeCell from './HomeCell';
import axios from 'axios';
import URLConf from '../../config/URLConf';

const deviceW = Dimensions.get('window').width;
const padding = 20;

export default class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }
  /* 生命周期调用获取数据 */
  componentDidMount = () => {
    this.getDataSource();
  }
  /* 获取数据 */
  getDataSource = () => {
    axios.get(URLConf.API_BASE + 'blog', {
      params: {
        page: 0,
        rowNum: 8
      }
    })
    .then((response) => {
      let data = this.packData(response.data.blogs);
      this.setState({dataSource: data});
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  /* 封装数据 */
  packData = (obj) => {
    let data = []
    // 显示分组头部
    // data.push({ data: obj, name: '分类1' })
    data.push({ data: obj })
    return data
  }
  _renderItem = ({item}) => {
    return <HomeCell
             dataSource={item}
             navigator={this.props.navigator}
           />
  }
  _renderSectionHeader = ({section}) => {
    return <Text>{section.name}</Text>
  }
  //去除key警告
  extraUniqueKey(item, index){
    return index+item;
  }
  render() {
    return (
      <View style = {styles.container}>
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={this.state.dataSource}
          keyExtractor={this.extraUniqueKey}
          onRefresh={() => alert('onRefresh: nothing to refresh :P')}
          refreshing={false}
          style={styles.sectionList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionList: {
    width: deviceW,
  }
});
