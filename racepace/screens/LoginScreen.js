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
    width:"80%",
    borderRadius:10,
  },
  button_text: {
    padding:"1%",
    fontSize:16,
  },
  back_btn: {
    width:40,
    height:"5%",
    left:5,
    top:20,
    borderRadius:10,
  },
  logo: {
    margin:"5%",
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.5 / 2,
  },
})

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "Jasonemail5",
      pword: "jasonpassword",
      isSigninInProgress: false,
    };
  }

  componentDidUpdate() {
    console.log("update")
  }

  render() {
    return (
      <View>
      <Button
          style={STYLES.back_btn}
          text="Back"
          text_style={STYLES.button_text}
          onPress={()=>this.props.navigation.goBack()}
      />
      <View 
        style={{alignItems:"center", flexDirection:"column",height:"95%",justifyContent: 'space-evenly'}}
      >
        <Image style={STYLES.logo} source={require('../assets/running.jpg')} />
        <TextInput
          autoCorrect={false}
          style = {STYLES.input}
          defaultValue={'Jasonemail5'}
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
          defaultValue={'jasonpassword'}
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
      </View>
      </View>
    );
  }
}
