import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import TextInputCustom from '../components/TextInput';
import Button from '../components/Button';
import BackButton from '../components/BackButton'
import DatePicker from 'react-native-datepicker';
import { register } from '../functions/login';
import '../global';
import Color from '../constants/Color'

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
  dob: {
    width: '80%',
  },
});

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      pword: '',
      dob: '',
      username: '',
    };
  }

  render() {
    return (
      <View style={{backgroundColor:Color.darkBackground, flex:1}}>
        <BackButton
          onPress={this.props.navigation.goBack}
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
          <DatePicker
            style={STYLES.dob}
            mode="date" //The enum of date, datetime and time
            placeholder="Enter Date of Birth"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ date: date });
            }}
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
            onPress={register.bind(this)}
          />
        </View>
      </View>
    );
  }
}
