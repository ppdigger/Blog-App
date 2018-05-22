import React from 'react';
import {
  View,
  AppRegistry,
  ReactNative,
  StyleSheet
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import App from './src/App';

class MyApp extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <Navigator
          initialRoute={{ component: App }}
          configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
          }} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('newApp', () => MyApp);
