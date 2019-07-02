// Jason Yu

import { Component } from React from 'react';

import { View, Text, StyleSheet, Alert } from 'react-native'
import { Image } from 'react-native-elements'
import Button from './Button.js'

const STYLES = StyleSheet.create({
  button_text: {
    fontSize: 16
  },
  back_btn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class BackButton extends React.Component {
  render () {
    return (
      <Button
        style={STYLES.back_btn}
        text="Back"
        text_style={STYLES.button_text}
        onPress={() => this.props.onPress()}
      />
    )
  }
}
