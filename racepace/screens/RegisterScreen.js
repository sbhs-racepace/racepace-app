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
import Button from '../components/Button.js'
import PickTwo from '../components/PickTwo'
import {register} from "../login"
import '../global';

const STYLES = StyleSheet.create({
  input: {
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    marginTop: 5,
    paddingLeft: 3,
    width:"80%"
  },
  general: {
    marginTop: 5,
    width:"80%"
  },
  pickTwo: {
    width:"50%"
  }
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
      <View style={{alignItems:"center"}}>
        <Image style={STYLES.general} source={require('../assets/cat.jpeg')} />
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
        <Button style={STYLES.general} text="Register" onPress={register.bind(this)} />
      </View>
    );
  }
}
