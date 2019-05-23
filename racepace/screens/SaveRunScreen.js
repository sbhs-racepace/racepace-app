import React from 'react';
import { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Button from '../components/Button.js';
import '../global.js';

export default class SaveRunScreen extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      name: 'name',
      description: 'description',
    };
  }

  saveRun() {
    let data = {
      name: this.state.name,
      description: this.state.description,
      route: this.props.navigation.state.params
    };
    let url = `${global.serverURL}/api/save_route`;
    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          Authorization: global.login_status.token,
        }),
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          res => {
            console.log('Success Saving Route');
          },
          reason => {
            console.log('Promise rejected');
            Alert.alert('Error connecting to server', reason);
          }
        );
    } catch (err) {
      Alert.alert('Error', err);
    }
  }

  render() {
    if (this.props.navigation.state.params == undefined) {
      return <Text>An internal error occured</Text>;
    }
    return (
      <View>
        <Text>Save Run Screen</Text>
        <Text>
          {this.props.navigation.state.params.start} to{' '}
          {this.props.navigation.state.params.end}
        </Text>
        <TextInput
          placeholder="Name"
          onChangeText={name => {
            this.setState({ name });
          }}
          defaultValue="Name"
        />
        <TextInput
          placeholder="Description"
          onChangeText={description => {
            this.setState({ description });
          }}
          defaultValue="Description"
        />
        <Button
          text="Save Run"
          onPress={() => {
            Alert.alert('Saving Run');
            this.saveRun().bind(this);
            console.log('navigating to feed following');
            this.props.navigation.navigate('FeedFollowing');
          }}
        />
      </View>
    );
  }
}
