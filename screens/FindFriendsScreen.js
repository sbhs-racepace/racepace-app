import React from 'react';
import { Component } from 'react';
import {
  Alert,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Button from '../components/Button.js';
import BackButton from '../components/BackButton'
import '../global'
import Color from '../constants/Color'

const { width: windowWidth, height: windowHeight } = Dimensions.get(
  'window'
);

const STYLES = StyleSheet.create({
  search_btn: {
    width: 30,
    height: 30,
    borderRadius: 0.135 * windowWidth,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img_style: {
    width:30,
    height:30,
    borderRadius: 0.135 * windowWidth
  },
  search_box: {
    height:30,
    fontSize: 20,
    borderWidth: 1,
    width: '70%',
    borderRadius: 10,
    padding: '1%',
  },
  text: {
    fontSize: 15,
    color:Color.textColor,
    alignItems:'center',
  },
  title: {
    fontFamily:'RobotoCondensed-BoldItalic',fontSize:40,color:Color.primaryColor, textAlign:'center',
  },
});


class FriendBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View flexDirection="row">
        <Image
          source={{ uri: this.props.imageURL }}
          style={{ height: 100, width: 100, borderRadius: 50 }}
        />
        <View flexDirection="column">
          <Text style={STYLES.text}>{this.props.name}</Text>
          <Text style={STYLES.text}>{this.props.bio}</Text>
        </View>
      </View>
    );
  }
}

export default class FindFriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { id: 1, name: 'Test', bio: 'This is a bio' },
        { id: 2, name: 'TestUser2', bio: 'Another bio' },
      ],
      recommended: true,
    };
    this.searchString = '';
  }

  sendRequest() {
    try {
      fetch(global.serverURL+"/api/find_friends", {
        method: 'POST',
        body: "name="+this.searchString,
      })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(
          async res => {
            res = await res.json(); //Parse response as JSON
            this.setState({searchResults: res});
          },
          reason => {
            console.log('Promise rejected');
            Alert.alert('Error connecting to server', reason);
          }
        );
    } catch (err) {
      //Catch any other errors
      Alert.alert('Error', err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 , backgroundColor:Color.lightBackground}}>
        <BackButton
          onPress={this.props.navigation.goBack}
        />
        <View style={{ flex:1, width: '100%', alignItems:'center', justifyContent:'space-evenly'}}>
          <Text style={STYLES.title}>Find Friends</Text>
          <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
            <TextInput
              style={STYLES.search_box}
              onChangeText={text => {
                this.searchString = text;
              }}
            />
            <Button
              img={require('../assets/icons/search.png')}
              img_style={STYLES.img_style}
              style={STYLES.search_btn}
              onPress={this.sendRequest.bind(this)}
            />
          </View>
          <Button
            style={global.component_styles.roundedButton}
            text="Refresh"
            onPress={() => (Alert.alert('Not Implemented'))}
          />
        </View>
        <ScrollView style={{ width: '100%' }}>
          {this.state.searchResults.map(user => (
            <FriendBox
              name={user.name}
              bio={user.bio}
              imageURL={
                global.serverURL + '/api/images/get_user_image/' + user.id
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
