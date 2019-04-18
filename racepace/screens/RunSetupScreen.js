import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, Picker, Dimensions } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const STYLES = StyleSheet.create({
  route_input : {
    borderWidth:1,
    padding:"5%",
    flex:3
  },
  route_info : {
    borderWidth:1,
    padding:"5%",
    flex:2
  },
  route_type: {
    borderWidth:1,
    padding:"5%",
    flex:1,
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
      <View style={{flexDirection:"column", flex:1}}>
        <View style={STYLES.route_input}>
          <Text>Create Route</Text>
          <TextInput placeholder="start"/>
          <TextInput placeholder="end"/>
          <TextInput placeholder="pace"/>
        </View>
        <View style={STYLES.route_type}>
          <Picker
            selectedValue={this.state.route_type}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({route_type: itemValue})
            }>
            <Picker.Item label="Default Route" value="default" />
            <Picker.Item label="Scenic Route" value="scenic" />
          </Picker>
        </View>
        <View style={STYLES.route_info}>
          <Text>Start to End takes 20 minutes</Text>
          <Text>500 calories burnt</Text>
          <Text>10km run</Text>
          <Text>average 5 degree incline</Text>
        </View>
        <View>
          <Button text="Start Run"/>
        </View>
      </View>
    );
  }
}