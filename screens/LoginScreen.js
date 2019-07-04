// Jason Yu, Sunny Yan

import React from 'react';
import { Component } from 'react';
import Color from '../constants/Color'
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Image } from 'react-native-elements'
import { login, execute_login, googleLogin } from '../functions/login';
import Button from '../components/Button.js';
import TextInputCustom from '../components/TextInput';
import '../global';
import BackButtonHeader from '../components/BackButtonHeader'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  button_text: {
    padding: '1%',
    fontSize: 16,
  },
  logo: {
    margin: '5%',
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    borderRadius: windowWidth * 0.7 / 2,
  },
  title: {
    fontFamily:'Roboto-Bold',fontSize:70,color: Color.primaryColor,
  },  
  roundedButton: {
    width: '80%',
  }
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
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
        <BackButtonHeader
          title="Login Screen"
          onPress={this.props.navigation.goBack}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            flex:1,
            justifyContent: 'space-evenly',
          }}
        >
          <Text style={[STYLES.title]}>Racepace</Text>
          <TextInputCustom
            autoCorrect={false}
            defaultValue="email"
            onChangeText={email => this.setState({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            placeholder="Email"
            placeholderTextColor={Color.textColor}
          />
          <TextInputCustom
            autoCorrect={false}
            defaultValue={'password'}
            onChangeText={pword => this.setState({ pword })}
            returnKeyType="go"
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={Color.textColor}
          />
          <Button
            style={STYLES.roundedButton}
            text_style={STYLES.button_text}
            onPress={execute_login.bind(this, this.state.email, this.state.pword)}
            text="Login"
          />
          <Button
            style={STYLES.roundedButton}
            text_style={STYLES.button_text}
            onPress={googleLogin}
            text="Login with Google"
          />
        </View>
      </View>
    );
  }
}
