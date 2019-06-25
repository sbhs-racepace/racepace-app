// Jason Yu

import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Button from './Button.js';

const STYLES = StyleSheet.create({
  button_text: {
    fontSize: 16,
  },
  back_btn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class BackButton extends React.Component {
  render() {
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