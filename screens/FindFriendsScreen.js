import React from 'react';
import { Component } from 'react';
import { Alert, View, ScrollView, Text,TextInput, Dimensions, StyleSheet } from 'react-native';
import { Image, ListItem, SearchBar } from 'react-native-elements'
import Button from '../components/Button.js';
import BackButtonHeader from '../components/BackButtonHeader'
import '../global'
import Color from '../constants/Color'
import request from '../functions/request'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

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
      searchString: "",
      searchResults: [
      ],
      recommended: true,
    };
  }

  async sendRequest(text) {
    console.log('sending req')
    fetch(global.serverURL+"/api/find_friends", {
      method: 'POST',
      body: JSON.stringify({name: text}),
      headers: {
          authorization: global.login_info.token
      }
    })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res => {
        console.log(res)
        res = await res.json(); //Parse response as JSON
        console.log(res)
        this.setState({searchResults: res});
      }
    );
  }

  render() {
    return (
      <View style={{ flex: 1 , backgroundColor:Color.lightBackground}}>
        <BackButtonHeader
          onPress={this.props.navigation.goBack}
          title='Find Friends'
        />
        <SearchBar
            placeholder="Type Here..."
            onChangeText={text => {
                this.setState({searchString: text})
                this.sendRequest.bind(this)(text)
                }}
            value={this.state.searchString}
        />
        <ScrollView style={{ width: '100%' }}>
          {this.state.searchResults.map(user => (
            <ListItem
              title={user.name}
              subtitle={user.bio}
              leftAvatar={{ source: { uri: global.serverURL + `/api/avatars/${user.user_id}.png` } }}
              containerStyle={{backgroundColor: Color.darkBackground}}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
