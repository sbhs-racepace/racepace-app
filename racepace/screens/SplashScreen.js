import React from 'react';
import { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Button from '../components/Button.js'
import { Font } from 'expo'
import '../global.js'

const STYLES = StyleSheet.create({
  button: {
    width:"80%",
    borderRadius:10,
  },
  button_text: {
    padding:"2%",
    fontSize: 16
  },
  title: {
    fontFamily:'RobotoCondensed-BoldItalic',fontSize:60,color:global.colors.primaryColor
  },
  logo: {
    margin:"5%",
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: Dimensions.get('window').width * 0.8 / 2,
  },
})

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontLoaded:false}
  }

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-BoldItalic': require('../assets/fonts/RobotoCondensed-BoldItalic.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={[global.view_styles.columnCenterView,{backgroundColor:global.colors.darkBackground, justifyContent:'space-evenly'}]}>
          {
            this.state.fontLoaded ? (
              <Text style={STYLES.title}>Racepace</Text>
            ) : <Text>Expo Loading</Text>
          }
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