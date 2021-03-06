// Sunny Yan, Jason Yu

import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements'
import Button from '../components/Button.js'
import Color from '../constants/Color'

const STYLES = StyleSheet.create({
  button: {
    width:"80%",
  },
  button_text: {
    padding:"2%",
    fontSize: 20,
  },
  title: {
    fontFamily:'Roboto-Bold',fontSize:70,color:Color.primaryColor,
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: Dimensions.get('window').width * 0.8 /2,
  },
})

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={{ alignItems:"center", flexDirection:"column", flex:1, backgroundColor:Color.darkBackground, justifyContent:'space-evenly'}}>
        <Text style={[STYLES.title]}>Racepace</Text>
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
          onPress={()=>this.props.navigation.navigate("Feed")}
        />
      </View>
    )
  }
}