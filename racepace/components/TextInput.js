import * as React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderAbove: false
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
          style={StyleSheet.flatten(STYLES.input, this.props.input_style)}
          onChangeText={text => {
            this.props.onChangeText(text);
            this.setState({ placeholderAbove: text != '' });
          }}
        />
      </View>
    );
  }
}
