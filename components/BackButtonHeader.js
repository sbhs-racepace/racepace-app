import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import BackButton from './BackButton'
import Color from '../constants/Color'
import Button from './Button'

export default class BackButtonHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let STYLES = StyleSheet.create({
      title: {
        fontFamily:'Roboto',fontSize:20,color: Color.textColor,
        alignSelf:'center'
      },
      view: {
        width:"100%", height:50, padding:3, borderBottomColor:'yellow', borderBottomWidth:1
      }
    });

    return (
      <View style={STYLES.view}>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{justifyContent:'center'}}>
            <BackButton
              onPress={this.props.onPress}
            />
          </View>
          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={STYLES.title}>{this.props.title}</Text>
          </View>
          <View style={{width:40}}/>
        </View>
      </View>
    )
  }
}