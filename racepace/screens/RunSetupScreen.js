import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Dimensions } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const STYLES = StyleSheet.create({
  route_input : {
    borderWidth:1,
  },
  text_style: {
    fontSize: 40,
  },
  route_info : {
    borderWidth:1,
  },
  route_type: {
    borderWidth:1,
  },
  input_view: {
    borderWidth: 1,
    borderRadius:10,
  },
  pace_view: {
    borderWidth: 1,
    borderRadius:10,
    flexDirection:"row",
    alignItems:"center"
  },
})

export default class RunSetupScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      route_type : "default",
    }
  }
  
  render() {
    return(
      <ScrollView>
        <View style={STYLES.route_input}>
          {/* <Text style={[STYLES.text_style,{textAlign:"center"}]}>Plan Route</Text>
          <TextInput style={[STYLES.text_style,STYLES.input_view]} placeholder="start"/>
          <TextInput style={[STYLES.text_style,STYLES.input_view]} placeholder="end"/>
          <View style={STYLES.pace_view}>
            <TextInput style={STYLES.text_style} placeholder="minutes"/>
            <Text style={STYLES.text_style}>:</Text>
            <TextInput style={STYLES.text_style} placeholder="seconds"/>
          </View> */}
        </View>
        <View style={{height:1000}}>

        </View>
        <Text>afds</Text>
        {/* <View style={STYLES.route_type}>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Route Type</Text>
          <Text style={STYLES.text_style}>Default</Text>
          <Text style={STYLES.text_style}>Scenic</Text>
        </View>
        <View style={STYLES.route_info}>
          <Text style={[STYLES.text_style,{textAlign:"center"}]}>Route Information</Text>
          <Text style={STYLES.text_style}>Time: 20 minutes</Text>
          <Text style={STYLES.text_style}>Total Distance: 10.6km</Text>
          <Text style={STYLES.text_style}>Calories: 500 calories burnt</Text>
          <Text style={STYLES.text_style}>Average Incline: 5 Degrees</Text>
          <Text style={STYLES.text_style}>Points: 50</Text>
        </View>
        <View>
          <Button text_style={{padding:"5%"}} style={{borderRadius:10}} text="Start Run"/>
        </View> */}
      </ScrollView>
    );
  }
}