import * as React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
export default class TextInputCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderAbove: Boolean(this.props.placeholder)
    }
  }

  render() {
    const STYLES = StyleSheet.create({
      input: {
      }
    });
    return (
      <View style={this.props.style}>
        {this.state.placeholderAbove &&
          <Text>{this.props.placeholder}</Text>
        }
        <TextInput
          {...this.props}
          style={StyleSheet.flatten(this.props.input_style,STYLES.input)}
          onChangeText={text => {
            this.props.onChangeText(text);
            this.setState({ placeholderAbove: text != '' });
          }}
        />
      </View>
    );
  }
}
