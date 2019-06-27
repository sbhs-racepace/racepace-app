// Jason Yu

import React from 'react';
import { View, AsyncStorage } from 'react-native';
import '../global';
import * as Font from 'expo-font'
import { storeUserInfo } from '../functions/login'
import Color from '../constants/Color'
import * as Permissions from 'expo-permissions'

export default class StartupScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    global.location_permission = await Permissions.askAsync(Permissions.LOCATION);
    await Font.loadAsync({
      'RobotoCondensed-BoldItalic' : require('../assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'Roboto-Thin' : require('../assets/fonts/Roboto-Thin.ttf'),
      'Roboto-Bold' : require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto' : require('../assets/fonts/Roboto-Regular.ttf'),
    });
    let login_info = await AsyncStorage.getItem('login_info');
    if (login_info !== null) {
      global.login_info = login_info;
      storeUserInfo();
      this.props.navigation.navigate("Feed")
    } else {
      this.props.navigation.navigate("Splash")
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:Color.darkBackground}}>
      </View>
    )
  }
}
