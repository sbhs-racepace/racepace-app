// Sunny Yan

import * as React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


import Color from '../constants/Color'

export default class TextInputCustom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const STYLES = StyleSheet.create({
      view: {
        width: "80%",
        borderRadius:7,
        backgroundColor: Color.lightBackground2,
        ...this.props.style
      },
      text: {
        color: Color.textColor,
        ...this.placeholder_style
      },
      input: {
        height: 40,
        left:5,
        padding: 1,
        fontSize:20,
        color: Color.textColor,
        ...this.props.input_style,
      }
    });
    return (
      <View style={STYLES.view}>
        <Text style={[STYLES.text, {left:5}]}>{this.props.placeholder}</Text>
        <TextInput
          {...this.props}
          style={[STYLES.input, this.props.text_style]}
		  placeholder=""
        />
      </View>
    );
  }
}
