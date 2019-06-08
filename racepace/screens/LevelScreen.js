//Write a request to backend for level and points

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Button from '../components/Button';
import '../global';

export default class LevelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      points: 24759,
      remainder: 5241,
    };
  }

  render() {
    const STYLES = StyleSheet.create({
      progressBar: {
        backgroundColor: 'gray',
        width: '80%',
        height: '15%',
        borderRadius: 20,
      },
      progressBarFill: {
        backgroundColor: 'blue',
        width: (this.state.points / 30000) * 100 + '%',
        height: '100%',
        borderRadius: 20,
      },
      remainderText: {
          fontSize: 25, 
          textAlign: 'center', 
          width: '80%',
      },
      header: {
      top: '0%',
      borderWidth: 1,
      },
    });

    return (
      <View style={{flex:1}}>
        <Button style={STYLES.header} back_btn={true} />
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontSize: 40 }}>You are level {this.state.level}</Text>
        <View style={STYLES.progressBar}>
          <View style={STYLES.progressBarFill} />
        </View>
        <Text style={STYLES.remainderText}>
          {this.state.remainder} more points are required to level up. Race on!
        </Text>
      </View>
      </View>
    );
  }
}
