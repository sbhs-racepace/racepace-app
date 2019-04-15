import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let styles = {
      button: {
        backgroundColor: "rgb(0, 153, 255)",
        borderWidth: 1,
      },
      text: {
        textAlign:"center",
        color:"white"
      }
    };
    if (this.props.style) styles.button = Object.assign(styles.button,this.props.style)
    if (this.props.text_style) styles.text = Object.assign(styles.text, this.props.text_style)
    styles = StyleSheet.create(styles)
    
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}