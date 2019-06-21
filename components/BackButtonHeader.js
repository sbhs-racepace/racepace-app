import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import BackButton from './BackButton.js'
import Color from '../constants/Color'

const title = {
  fontSize: 20,
  color: Color.primaryColor,
  fontFamily: 'Roboto-Thin',
}

const button = {
  ...StyleSheet.absoluteFillObject,
  left:0,
  top:0,

}

export default class BackButtonHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{height:60, width:"100%", backgroundColor:Color.lightBackground}}>
        <View style={{flex:1, alignItems:'center', padding:2, flexDirection:'row'}}>
          <BackButton style={{alignSelf:"flex-start"}}/>
          <View style={{flex:1,alignItems:'center',alignSelf:'center'}}>
            <Text style={title}>{this.props.title}</Text>
          </View>
        </View>
      </View>
    )
  }
}