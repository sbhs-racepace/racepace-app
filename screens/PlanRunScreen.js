// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Dimensions, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import {createAppContainer,createMaterialTopTabNavigator} from 'react-navigation';
import TextInput from '../components/TextInput'
import { CheckBox } from 'react-native-elements'
import Button from "../components/Button"
import "../global.js"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Color from '../constants/Color'
import { createRun, createRunRoute } from '../functions/run_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  container: {
    justifyContent:"space-evenly", 
    flexDirection:"column",
    alignItems:'center'
  },
  text_style: {
    color: Color.textColor,
    fontSize:15,
    margin:3,
  },
  title_style: {
    fontSize:30,
    fontFamily: 'Roboto',
    textAlign:"center",
    color: Color.textColor
  },
})

class PlanRunScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    return(
      <View style={{flex:1,backgroundColor:Color.lightBackground}}></View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createRunRoute, createRun }, dispatch)
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanRunScreen);