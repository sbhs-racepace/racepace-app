import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import BackButton from './BackButton.js'

export default class BackButtonHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{height:40, width:"100%", backgroundColor:'white'}}>
        <BackButton
          onPress={this.props.onPress}
        />
        <Text style={{color:"white"}}>{this.props.text}</Text>
      </View>
    )
  }
}