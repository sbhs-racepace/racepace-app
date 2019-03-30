import React from 'react';
import { Prompt, display_prompt } from '../components/Prompt';
import { View, Text, Alert } from 'react-native';
import Button from "../components/Button"
//import "../global.js"

export default class DetailScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>Name: {this.props.navigation.state.routeName}</Text>
      </View>
    );
  }
}
