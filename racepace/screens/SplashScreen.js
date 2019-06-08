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
      <View style={[{alignItems:"center", flexDirection:"column",flex:1,justifyContent: 'space-evenly'},global.styles.background]}>
          {
            this.state.fontLoaded ? (
              <Text style={[{fontFamily:'RobotoCondensed-BoldItalic',fontSize:60},global.styles.genericColor]}>Racepace</Text>
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