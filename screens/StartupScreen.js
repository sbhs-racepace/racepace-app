// Jason Yu

import React from 'react';
import { View } from 'react-native';
import '../global';
import * as Font from 'expo-font'
import Color from '../constants/Color'

export default class StartupScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-BoldItalic' : require('../assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'Roboto-Thin' : require('../assets/fonts/Roboto-Thin.ttf'),
      'Roboto-Bold' : require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto' : require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.props.navigation.navigate("Splash")
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:Color.darkBackground}}>
      </View>
    )
  }
}
