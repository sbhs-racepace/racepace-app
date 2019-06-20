import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import '../global';
import { Font } from 'expo-font'

export default class LoadScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-BoldItalic' : require('../assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'Roboto-Thin' : require('../assets/fonts/Roboto-Thin.ttf'),
      'Roboto-Bold' : require('../assets/fonts/Roboto-Bold.ttf')
    });
    this.props.navigation.navigate("Splash")
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:global.colors.darkBackground}}>
      </View>
    )
  }
}
