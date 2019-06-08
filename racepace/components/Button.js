import * as React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import '../global.js'

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      button: {
        backgroundColor: this.props.disabled
          ? global.styles.grey.color
          : global.styles.genericColor.color
        ,
        width: this.props.back_btn ? 40 : "80%",
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        ...this.props.style,
      },
      text: {
        textAlign: 'center',
        color: global.styles.genericColorTwo.color,
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
