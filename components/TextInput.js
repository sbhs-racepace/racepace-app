import * as React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import '../global'

import Color from '../constants/Color'

export default class TextInputCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderAbove: Boolean(this.props.placeholder)
    }
  }

  render() {
    const STYLES = StyleSheet.create({
      view: {
        width: "80%",
        borderRadius: 10,
        backgroundColor: Color.lightBackground,
        ...this.props.style
      },
      text: {
        color: Color.textColor,
        ...this.placeholder_style
      },
      input: {
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        padding: 1,
        fontSize:20,
        color: Color.textColor,
        ...this.props.input_style,
      }
    });
    return (
      <View style={STYLES.view}>
        {this.state.placeholderAbove &&
          <Text style={STYLES.text}>{this.props.placeholder}</Text>
        }
        <TextInput
          {...this.props}
          style={STYLES.input}
          onChangeText={text => {
            this.props.onChangeText(text);
            this.setState({ placeholderAbove: text != '' });
          }}
        />
      </View>
    );
  }
}
