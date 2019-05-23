import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { login, googleLogin } from '../login';
import Button from '../components/Button.js';
import TextInput from '../components/TextInput';
import '../global';

const STYLES = StyleSheet.create({
  input: {
    width: '80%',
  },
  input_inner: {
    borderRadius: 10,
    padding: '1%',
    fontSize: 20,
    borderWidth: 1,
  },
  button: {
    width: '80%',
    borderRadius: 10,
  },
  button_text: {
    padding: '1%',
    fontSize: 16,
  },
  back_btn: {
    width: 40,
    height: '5%',
    left: 5,
    top: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    margin: '5%',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
  },
});

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'email',
      pword: 'password',
      isSigninInProgress: false,
    };
  }

  render() {
    return (
      <View>
        <Button
          style={STYLES.back_btn}
          text="Back"
          text_style={STYLES.button_text}
          onPress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            height: '95%',
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={STYLES.logo}
            source={require('../assets/running.jpg')}
          />
          <TextInput
            autoCorrect={false}
            style={STYLES.input}
            input_style={STYLES.input_inner}
            defaultValue="email"
            onChangeText={email => this.setState({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <TextInput
            autoCorrect={false}
            defaultValue={'password'}
            style={STYLES.input}
            input_style={STYLES.input_inner}
            onChangeText={pword => this.setState({ pword })}
            returnKeyType="go"
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <Button
            style={STYLES.button}
            text_style={STYLES.button_text}
            onPress={() => login(this.state.email, this.state.pword)}
            text="Login"
          />
          <Button
            style={STYLES.button}
            text_style={STYLES.button_text}
            onPress={googleLogin}
            text="Login with Google"
          />
        </View>
      </View>
    );
  }
}
