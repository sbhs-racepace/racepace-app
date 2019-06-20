import React from 'react';
import { Component } from 'react';
import Color from '../constants/Color'
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { login, googleLogin } from '../functions/login';
import Button from '../components/Button.js';
import TextInputCustom from '../components/TextInput';
import '../global';
import Color from '../constants/Color'
import BackButton from '../components/BackButton'

const STYLES = StyleSheet.create({
  button_text: {
    padding: '1%',
    fontSize: 16,
  },
  logo: {
    margin: '5%',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
  },
  title: {
    fontFamily:'RobotoCondensed-BoldItalic',fontSize:60,color: Color.primaryColor,
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
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
        <BackButton
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
