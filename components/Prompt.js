// Sunny Yan

import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Button from "Button"

export class Prompt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const STYLES = StyleSheet.create({
      view: {
        position: "absolute",
        left: "10%",
        top: "25%",
        width: "80%",
        height: "50%",
        display: this.props.hide ? "flex" : "none",
      },
      heading: {
        fontSize: 14,
        fontWeight: "bold"
      }
    })
    let textInputs;
    let userInputs = {};
    for (let message of this.props.inputs) {
      textInputs += (
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => { userInputs[message] = text; }}
          placeholder={message}
        />
      )
    }

    return (
      <View style={STYLES.view}>
        <Text style={STYLES.heading}>{this.props.title}</Text>
        {this.props.message!="" && <Text>{this.props.message}</Text>}
        {textInputs}
        <View style={{flexDirection:"row"}}>
          <Button text="Cancel" onPress={()=>{this.props.hide = true;}} />
          <Button text="OK" onPress={()=>{this.props.hide = true;
            this.props.onSubmit(Object.values(userInputs));
          }} />
        </View>
      </View>
    )
  }
}

/*
<Prompt title={this.state.prompt.title} message={this.state.prompt.message} inputs={this.state.prompt.inputs} hide={this.state.prompt.hide} onSubmit={this.state.prompt.onSubmit} />
*/
export function display_prompt(title,message,inputs,onSubmit) {
  this.setState({
    prompt: {
      title: title,
      message: message,
      inputs: inputs, // An array of placeholders for each field to display
      onSubmit: onSubmit, // A function to call when OK button is pressed. Will pass one parameter: a list containing each answer the user gave
      hide: false
    }
  })
}