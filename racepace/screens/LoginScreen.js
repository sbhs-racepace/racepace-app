import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {login, googleLogin} from "../login"
import Button from '../components/Button.js'
import '../global';

const STYLES = StyleSheet.create({
  input: {
    fontSize:20,
    borderWidth: 1,
    width:"80%",
    borderRadius:10,
    padding:"1%",
  },
  button: {
    fontSize:20,
    width:"80%",
    borderRadius:10,
  },
  button_text: {
    padding:"1%"
  },
  logo: {
    margin:"5%",
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.5 / 2,
  },
  title: {
    fontSize:50,
    fontFamily:"Courier New",
    fontStyle:'italic',
  }
})

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'aaa',
      pword: 'bbb',
      isSigninInProgress: false,
    };
  }

  componentDidUpdate() {
    console.log("update")
  }

  render() {
    return (
      <View 
        style={{alignItems:"center", flexDirection:"column",flex:1,justifyContent: 'space-evenly'}}
      >
        <Text style={STYLES.title}>Racepace</Text>
        <Image style={STYLES.logo} source={require('../assets/running.jpg')} />
        <TextInput
          autoCorrect={false}
          defaultValue="aaa"
          style = {STYLES.input}
          ref={el => {
            this.email = el;
          }}
          onChangeText={email => {
            this.setState({ email: email });
          }}
          keyboardType="email-address"
          returnKeyType="go"
          placeholder="Email or Mobile Num"
          placeholderTextColor="rgba(225,225,225,0.8)"
        />
        <TextInput
          autoCorrect={false}
          defaultValue="bbb"
          style = {STYLES.input}
          ref={el => {
            this.pword = el;
          }}
          onChangeText={pword => {
            this.setState({ pword });
          }}
          returnKeyType="go"
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="rgba(225,225,225,0.8)"
        />
        <Button style={STYLES.button} text_style={STYLES.button_text} onPress={login.bind(this)} text="Login" />
        <Button
          style={STYLES.button}
          text_style={STYLES.button_text}
          onPress={() => {
            global.login_status = { success: true };
            this.props.navigation.navigate('Main');
          }}
          text="Login as guest"
        />
        <Button style={STYLES.button} text_style={STYLES.button_text} onPress = {() => this.props.navigation.navigate('Register')} text="Register" />
        <Button style={STYLES.button} text_style={STYLES.button_text} onPress={googleLogin} text="Login with Google" />
      </View>
    );
  }
}
