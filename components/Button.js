// Sunny Yan

import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Color from '../constants/Color'

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      button: {
        backgroundColor: this.props.disabled
          ? Color.offColor
          : Color.buttonColor
        ,
        width: this.props.back_btn ? 40 : "80%",
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...this.props.style,
      },
      text: {
        textAlign: 'center',
        color: Color.textColor,
        ...this.props.text_style,
      },
      img: {
        ...this.props.img_style,
      },
    });

    return (
      <TouchableOpacity
        {...this.props}
        style={styles.button}
        onPress={
          this.props.back_btn
            ? () => this.props.navigation.goBack()
            : this.props.onPress
        }
        >
        {this.props.img && 
          <Image
            source={this.props.img}
            style={styles.img}
          />
        }
        {this.props.text &&
          <Text
            style={styles.text}>
            {this.props.text}
          </Text>
        }
        {!this.props.text && this.props.back_btn &&
          <Text style={styles.text}>Back</Text>
        }
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Button);
