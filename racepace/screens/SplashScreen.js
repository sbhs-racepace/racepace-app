import React from 'react';
import { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Button from '../components/Button.js'

const STYLES = StyleSheet.create({
  button: {
    fontSize:20,
    width:"80%",
    borderRadius:10,
  },
  button_text: {
    padding:"1%",
    fontSize: 16
  },
  logo: {
    margin:"5%",
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: Dimensions.get('window').width * 0.8 / 2,
  },
  title: {
    fontSize:50,
    fontFamily:"Courier New",
    fontStyle:'italic',
  }
})

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={{alignItems:"center", flexDirection:"column",flex:1,justifyContent: 'space-evenly'}}>
        <Text style={STYLES.title}>Racepace</Text>
        <Image style={STYLES.logo} source={require('../assets/running.jpg')} />
        <Button
          text="Register"
          style={STYLES.button}
          text_style={STYLES.button_text}
          onPress={()=>this.props.navigation.navigate("Register")}
        />
        <Button
          text="Login"
          style={STYLES.button}
          text_style={STYLES.button_text}
          onPress={()=>this.props.navigation.navigate("Login")}
        />
        <Button
          text="Login as guest"
          style={STYLES.button}
          text_style={STYLES.button_text}
          onPress={()=>this.props.navigation.navigate("Map")}
        />
      </View>
    )
  }
}