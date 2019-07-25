//Roy Wu

import React from 'react';
import { Component } from 'react';
import { Alert, View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import TextInput from '../components/TextInput'
import { Image } from 'react-native-elements'
import Button from '../components/Button.js';
import BackButtonHeader from '../components/BackButtonHeader'
import '../global'
import Color from '../constants/Color'
import request from '../functions/request'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  text1: {
    fontSize: 40,
    color:Color.textColor,
    alignItems:'center',
    textAlign: 'center',

  },
    text2: {
    fontSize: 28,
    color:Color.textColor,
    alignItems:'center',
  },
});


class ExtendedDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View style={{ flex: 1 , backgroundColor:Color.lightBackground}}>
        <BackButtonHeader
          onPress={this.props.navigation.goBack}
          title='More Details'
        />
        <ScrollView contentContainerStyle={{ flex:1, width: '100%', alignItems:'center', justifyContent:'space-evenly', top: 0}}>
          <Text style={STYLES.text1}> Here are the details of your run: </Text>
          <Text style={STYLES.text2}> Route: from {this.props.navigation.state.params.run.run_info.start} to  {this.props.navigation.state.params.run.run_info.end} </Text>
          <Text style={STYLES.text2}> Distance: {this.props.navigation.state.params.run.run_info.final_distance}km </Text>
          <Text style={STYLES.text2}> Pace: {this.props.navigation.state.params.run.run_info.average_pace.minutes}:{this.props.navigation.state.params.run.run_info.average_pace.seconds} </Text>
          <Text style={STYLES.text2}> Duration: Started {this.props.navigation.state.params.run.run_info.start_time}, lasting a total of {this.props.navigation.state.params.run.run_info.final_duration.minutes} minutes and{this.props.navigation.state.params.run.run_info.final_duration.seconds} seconds</Text>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state
  return { user };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtendedDetailsScreen)