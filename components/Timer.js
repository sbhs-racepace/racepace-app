// Sunny Yan

import * as React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from './Button'
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hour:0, min:0, sec: 0, enable: false}
  }
  
  zFill(num) {
    if (num < 10) {
      return "0"+num
    }
    else {
      return num
    }
  }

  incrementTimer() {
      let {hour,min,sec} = this.state;
      sec++;
      if (sec == 60) {
          min++;
          sec=0;
      }
      if (min == 60) {
          hour++;
          min=0;
      }
      this.setState({hour,min,sec});
  }
  
  render() {
    return (
      <View style={{flexDirection: "row"}}>
      <Text>{this.state.hour==0 ? "" : this.state.hour+":"}{this.zFill(this.state.min)}:{this.zFill(this.state.sec)}</Text>
      <Button
        text={this.state.enable ? "◼" : "▷"}
        onPress={()=>{
            if (this.state.enable) {
              clearInterval(this.interval);
            }
            else {
              this.interval = setInterval(this.incrementTimer.bind(this),1000);
            }
            this.setState(
                (prevState)=>{return {enable: !prevState.enable}}
            )
        }}
      />
      </View>
    )
  }
}
