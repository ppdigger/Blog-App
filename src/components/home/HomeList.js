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
import Toast, {DURATION} from 'react-native-easy-toast';

const deviceW = Dimensions.get('window').width;
const padding = 20;

export default class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowNum: 8,
      noMore: false,
      isLoadingMore: false,
      dataSource: []
    }
  }
  /* 生命周期调用获取数据 */
  componentDidMount = () => {

  }
  /* 获取数据 */
  getDataSource = (flag) => {
    axios.get(URLConf.API_BASE + 'blog', {
      params: {
        page: this.state.page,
        rowNum: this.state.rowNum
      }
    })
    .then((response) => {
      if(response.data.success) {
        if(response.data.result.length < this.state.rowNum) {
          this.setState({
            noMore: true
          })
        }
        let data = this.packData(response.data.result);
        if(flag) {
          this.refs.toast.show('更新成功')
        } else {
          data = [...this.state.dataSource, ...data]
        }
        this.setState({
          isLoadingMore: false,
          dataSource: data,
          page: this.state.page+1
        })
      }
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
  // _renderSectionHeader = ({section}) => {
  //   return <Text>{section.name}</Text>
  // }
  //去除key警告
  extraUniqueKey(item, index){
    return index+item;
  }
  /* 下拉刷新 */
  _onRefresh = () => {
    this.setState({
      page: 0,
      noMore: false
    }, () => {
      this.getDataSource(true)
    })
  }
  /* 上拉刷新 */
  _onEndReached = () => {
    if(this.state.noMore || this.state.isLoadingMore) return;
    console.log(this.state.page)
    this.setState({
      isLoadingMore: true
    }, () => {
      this.getDataSource()
    })
  }
  render() {
    return (
      <View style = {styles.container}>
        <SectionList
          renderItem={this._renderItem}
          // renderSectionHeader={this._renderSectionHeader}
          sections={this.state.dataSource}
          keyExtractor={this.extraUniqueKey}
          onRefresh={this._onRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0}
          refreshing={false}
          style={styles.sectionList}
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
  sectionList: {
    width: deviceW,
  }
});
