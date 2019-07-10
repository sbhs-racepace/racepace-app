// Jason Yu

import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Alert, Platform, StatusBar } from 'react-native';
import { Image, Header } from 'react-native-elements'
import { Constants } from 'expo';
import Color from '../constants/Color'

let STYLES = StyleSheet.create({
  title: {
    fontFamily:'Roboto',fontSize:20,color: Color.textColor,
    alignSelf:'center'
  },
  view: {
    width:"100%", height:50, padding:3, borderBottomColor:Color.primaryColor, borderBottomWidth:1
  }
});

const styles = StyleSheet.create({
    container: {
      padding: '0%',
      backgroundColor: Color.darkBackground,
    },
  });

export default class BackButtonHeader extends React.Component {
  constructor(props) {
    super(props);
  }

      //   <View style={STYLES.view}>
    //     <View style={{flex:1,flexDirection:'row'}}>
    //       <View style={{justifyContent:'center'}}>
    //         <BackButton
    //           onPress={this.props.onPress}
    //         />
    //       </View>
    //       <View style={{flex:1, justifyContent:'center'}}>
    //         <Text style={STYLES.title}>{this.props.title}</Text>
    //       </View>
    //       <View style={{width:40}}/>
    //     </View>
    //   </View>

  render() {
    return (
    <Header
      leftComponent={{ icon: 'menu', name: 'arrow_back_ios', color: '#fff', onPress: this.props.onPress}}
      centerComponent={{ text: this.props.title, style: {color: Color.textColor }}}
      backgroundColor={Color.darkBackground}
      containerStyle={{ marginTop: -20 }}
    />
    )
  }
}