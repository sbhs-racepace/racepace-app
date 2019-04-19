import * as React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let styles = StyleSheet.create({
      button: {
        backgroundColor: 'rgb(0, 153, 255)',
        borderWidth: 1,
      },
      text: {
        textAlign: 'center',
        color: 'white',
      },
      img: {},
    });

    return (
      <TouchableOpacity
        style={StyleSheet.flatten([styles.button, this.props.style])}
        onPress={this.props.onPress}>
        {this.props.img && 
          <Image
            source={this.props.img}
            style={StyleSheet.flatten([styles.img, this.props.img_style])}
          />
        }
        {this.props.text && 
          <Text style={StyleSheet.flatten([styles.text, this.props.text_style])}>
            {this.props.text}
          </Text>
        }
      </TouchableOpacity>
    );
  }
}
