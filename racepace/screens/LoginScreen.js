import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {login, googleLogin} from "../login"
import Button from '../components/Button.js'
import '../global';

const STYLES = StyleSheet.create({
  input: {
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    marginTop: 5,
    paddingLeft: 3,
    width:"80%",
  },
  general: {
    marginTop: 5,
    width:"80%",
  },
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
      <View style={{alignItems:"center"}}>
        <Image style={STYLES.general} source={require('../assets/cat.jpeg')} />
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
        <Button style={STYLES.general} onPress={login.bind(this)} text="Login" />
        <Button
          style={STYLES.general}
          onPress={() => {
            global.login_status = { success: true };
            this.props.navigation.navigate('Main');
          }}
          text="Login as guest"
        />
        <Button style={STYLES.general} onPress = {() => this.props.navigation.navigate('Register')} text="Register" />
        <Button style={STYLES.general} onPress={googleLogin} text="Login with Google" />
      </View>
    );
  }
}
