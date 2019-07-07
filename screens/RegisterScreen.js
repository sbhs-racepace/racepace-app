// Jason Yu

import React from 'react';
import { Component } from 'react';
import { Image } from 'react-native-elements'
import { View, Text, StyleSheet, Alert, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import TextInputCustom from '../components/TextInput';
import Button from '../components/Button';
import BackButtonHeader from '../components/BackButtonHeader'
import { register, getUserInfo } from '../functions/login';
import Color from '../constants/Color'
import { storeUserInfo, storeLoginInfo } from '../functions/user_info_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const STYLES = StyleSheet.create({
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

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      pword: '',
      username: '',
      loading: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={{backgroundColor:Color.darkBackground, flex:1}}>
        <BackButtonHeader
          onPress={this.props.navigation.goBack}
          title='Register'
        />
        <View
          style={{
            alignItems: 'center',
            flex:1,
            justifyContent: 'space-evenly',
          }}>
          <TextInputCustom
            autoCorrect={false}
            onChangeText={name_ => {
              this.setState({ full_name: name_ });
            }}
            style={STYLES.input}
            returnKeyType="go"
            autoCapitalize="none"
            placeholder="Name"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <TextInputCustom
            autoCorrect={false}
            onChangeText={username => {
              this.setState({ username: username });
            }}
            style={STYLES.input}
            returnKeyType="go"
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <TextInputCustom
            autoCorrect={false}
            onChangeText={email => {
              this.setState({ email: email });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <TextInputCustom
            autoCorrect={false}
            onChangeText={pword => {
              this.setState({ pword });
            }}
            returnKeyType="go"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="rgba(225,225,225,0.8)"
          />
          <Button
            style={STYLES.button}
            text_style={STYLES.button_text}
            text="Register"
            onPress={()=> {
              this.setState({loading:true})
              register(this.state.email, this.state.pword,this.state.full_name,this.state.username);
            }}
            onPress={async ()=> {
              this.setState({loading:true})
              let registration_response = await register(this.state.email, this.state.pword,this.state.full_name,this.state.username);
              if (registration_response != false) {
                await this.props.storeLoginInfo(registration_response);
                let userInfo = await getUserInfo(this.props.user.token);
                this.props.storeUserInfo(userInfo)
                this.props.navigation.navigate('Feed');
              }
              this.setState({loading:false})
            }}
          >
            {this.state.loading && (
              <ActivityIndicator
                animating={true}
                color="white"
                size="large"
              />
            )}
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeUserInfo, storeLoginInfo }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
