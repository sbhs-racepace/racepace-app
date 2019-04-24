import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import Button from '../components/Button.js'
import PickTwo from '../components/PickTwo'
import {register} from "../login"
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

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      pword: "",
    };
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
      <View style={{alignItems:"center",height:"95%",justifyContent: 'space-evenly'}}>
        <Image style={STYLES.logo} source={require('../assets/running.jpg')} />
        <TextInput
          autoCorrect={false}
          onChangeText={name_ => {
            this.setState({ full_name: name_ });
          }}
          style={STYLES.input}
          returnKeyType="go"
          placeholder="Name"
          placeholderTextColor="rgba(225,225,225,0.8)"
        />
        <TextInput
          autoCorrect={false}
          onChangeText={email => {
            this.setState({ email: email });
          }}
          style={STYLES.input}
          keyboardType="email-address"
          returnKeyType="go"
          placeholder="Email"
          placeholderTextColor="rgba(225,225,225,0.8)"
        />
        <TextInput
          autoCorrect={false}
          onChangeText={pword => {
            this.setState({ pword });
          }}
          style={STYLES.input}
          returnKeyType="go"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(225,225,225,0.8)"
        />
        <Button
          style={STYLES.button}
          text_style={STYLES.button_text}
          text="Register"
          onPress={register.bind(this)}
        />
      </View>
      </View>
    );
  }
}
