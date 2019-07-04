import React from 'react';
import { Component } from 'react';
import {
  Alert,
  View,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Image } from 'react-native-elements';
import Button from '../components/Button.js';
import BackButtonHeader from '../components/BackButtonHeader';
import '../global';
import Color from '../constants/Color';
import FollowingScreen from './FollowingScreen';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Color.lightBackground,
  },
  text: {
    fontSize: 15,
    color: Color.textColor,
  },
});

export default class OldRunInformationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLES.container}>
        <BackButtonHeader
          title="allahu akbar"
          onPress={this.props.navigation.goBack}
        />
        <ScrollView>
          <Text></Text>
          <Text> </Text>
        </ScrollView>
      </View>
    );
  }
}
