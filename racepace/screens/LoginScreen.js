import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { login, googleLogin } from '../login';
import Button from '../components/Button.js';
import TextInputCustom from '../components/TextInput';
import '../global';
import BackButton from '../components/BackButton'

const STYLES = StyleSheet.create({
  button_text: {
    padding: '1%',
    fontSize: 16,
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
      <View style={{backgroundColor: global.colors.darkBackground}}>
        <BackButton
          onPress={this.props.navigation.goBack}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          <Image
            style={STYLES.logo}
            source={require('../assets/running.jpg')}
          />
          <TextInputCustom
            autoCorrect={false}
            defaultValue="email"
            onChangeText={email => this.setState({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <TextInputCustom
            autoCorrect={false}
            defaultValue={'password'}
            onChangeText={pword => this.setState({ pword })}
            returnKeyType="go"
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <Button
            style={global.component_styles.roundedButton}
            text_style={STYLES.button_text}
            onPress={login.bind(this, this.state.email, this.state.pword)}
            text="Login"
          />
          <Button
            style={global.component_styles.roundedButton}
            text_style={STYLES.button_text}
            onPress={googleLogin}
            text="Login with Google"
          />
        </View>
      </View>
    );
  }
}
