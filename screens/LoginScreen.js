// Jason Yu, Sunny Yan

import React from 'react';
import { Component } from 'react';
import Color from '../constants/Color'
import { Image } from 'react-native-elements'
import { View, Text, StyleSheet, Alert, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { login, googleLogin, getUserInfo } from '../functions/login';
import Button from '../components/Button.js';
import TextInputCustom from '../components/TextInput';
import BackButtonHeader from '../components/BackButtonHeader'
import { storeUserInfo, storeLoginInfo } from '../functions/user_info_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'email',
      pword: 'password',
      loading: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor: Color.darkBackground, flex:1}} behavior="padding">
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
            onPress={async ()=> {
              this.setState({loading:true})
              let login_response = await login(this.state.email, this.state.pword);
              if (login_response != false) {
                await this.props.storeLoginInfo(login_response);
                let userInfo = await getUserInfo(this.props.user.token);
                this.props.storeUserInfo(userInfo)
                this.props.navigation.navigate('Feed');
              }
              this.setState({loading:false})
            }}
            text="Login"
          >
            {this.state.loading && (
              <ActivityIndicator
                color="white"
                size="large"
              />
            )}
          </Button>
          <Button
            style={STYLES.roundedButton}
            text_style={STYLES.button_text}
            onPress={googleLogin}
            text="Login with Google"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeUserInfo, storeLoginInfo }, dispatch)
}

function mapStateToProps(state) {
  const {user} = state
  return {user};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
