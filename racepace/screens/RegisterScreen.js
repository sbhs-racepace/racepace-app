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
import DatePicker from 'react-native-datepicker';
import {register} from "../login"
import '../global';

const STYLES = StyleSheet.create({
  general: {
    marginTop: 5,
    width:"80%"
  },
  input: {
    fontSize:20,
    borderWidth: 1,
    width:"80%",
    borderRadius:10,
    padding:"1%",
  },
  dob: {
    width:'80%'
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
      dob:"",
      username: "",
    };
  }

  render() {
    return (
      <View style={{alignItems:"center",justifyContent:"space-evenly", flexDirection:"column", flex:1}}>
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
          onChangeText={username => {
            this.setState({ username: username });
          }}
          style={STYLES.input}
          returnKeyType="go"
          placeholder="Username"
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
        <DatePicker
          style={STYLES.dob}
          mode="date" //The enum of date, datetime and time
          placeholder="Enter Date of Birth"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date})}}
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
