// Jason Yu

import React from 'react'
import { View, AsyncStorage, StatusBar } from 'react-native'
import '../global'
import * as Font from 'expo-font'
import { storeUserInfo } from '../functions/login'
import Color from '../constants/Color'
import * as Permissions from 'expo-permissions'

export default class StartupScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  async componentDidMount () {
    console.disableYellowBox = true
    StatusBar.setBarStyle('light-content', true);
    global.location_permission = Boolean((await Permissions.askAsync(Permissions.LOCATION)).status)
    await Font.loadAsync({
      'RobotoCondensed-BoldItalic': require('../assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
      'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    })
    let login_info = await AsyncStorage.getItem('login_info')
    if (login_info !== null) {
      console.log(login_info,'dfsa')
      let json_login_info = JSON.parse(login_info)
      global.login_info = json_login_info
      await storeUserInfo()
      this.props.navigation.navigate('Feed')
    } else {
      this.props.navigation.navigate('Splash')
    }
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: Color.darkBackground }}>
      </View>
    )
  }
}