import * as React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from './Button'
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hour:0, min:0, sec: 0, enable: false}
  }
  
  incrementTimer() {
      {hour,min,sec} = this.state;
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
      <Text>{this.state.hour==0 ? "" : this.state.hour+":"}{this.state.min}:{this.state.sec}</Text>
      <Button
        text={this.state.enable ? "▷" : "◼"}
        onPress={()=>{
            this.setState(
                (prevState)=>{{enable: !prevState.enable}}
            )}
            if (this.state.enable) {
                this.interval = setInterval(this.incrementTimer.bind(this),1000);
            }
            else {
                clearInterval(this.interval);
            }
        }
      />
      </View>
    )
  }
}