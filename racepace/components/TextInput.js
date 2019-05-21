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
    let styles = StyleSheet.create({
    });

    return (
      <View>
        {this.state.placeholderAbove &&
          <Text>{this.props.placeholder}</Text>
        }
        <TextInput
          {...this.props}
          onChangeText={text => {
            this.props.onChangeText(text);
            this.setState({ placeholderAbove: text != '' });
          }}
        />
      </View>
    );
  }
}
