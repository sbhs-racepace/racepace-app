import React from 'react';
import { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Button from '../components/Button.js';

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
          <Text>{this.props.name}</Text>
          <Text>{this.props.bio}</Text>
        </View>
      </View>
    );
  }
}

export default class FindFriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{id:1,name:"Test",bio:"This is a bio"},
      {id:2,name:"TestUser2",bio:"Another bio"}],
      recommended: true,
    };
    this.searchString = '';
  }

  render() {
    const { width: windowWidth, height: windowHeight } = Dimensions.get(
      'window'
    );
    const STYLES = {
      search_btn: {
        width: '15%',
        height: '100%',
        borderRadius: 0.135 * windowWidth,
        borderWidth: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
      search_img: {
        width: '100%',
        height: '100%',
        borderRadius: 0.135 * windowWidth,
      },
      back_btn: {
        width: 40,
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      search_box: {
        fontSize: 20,
        borderWidth: 1,
        width: '85%',
        height: '100%',
        borderRadius: 10,
        padding: '1%',
      },
    };
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: '20%', width: '100%' }}>
          <View style={{ height: '30%', flexDirection: 'row' }}>
            <Button
              style={STYLES.back_btn}
              text="Back"
              text_style={STYLES.button_text}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text>Find Friends</Text>
          </View>
          <View
            style={{
              marginLeft: '5%',
              width: '90%',
              height: '30%',
              flex: 1,
              flexDirection: 'row',
            }}>
            <TextInput
              style={STYLES.search_box}
              onChangeText={text => {
                this.searchString = text;
              }}
            />
            <Button
              img={require('../assets/icons/search.png')}
              style={STYLES.search_btn}
              img_style={STYLES.search_img}
              onPress={() => {}}
            />
          </View>
          <Button />
          {this.state.recommended && (
            <Text style={{ height: '30%' }}>Recommended</Text>
          )}
        </View>
        <ScrollView style={{ height: '70%', width: '100%' }}>
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
