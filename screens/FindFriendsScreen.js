import React from 'react';
import { Component } from 'react';
import { Alert, View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import TextInput from '../components/TextInput'
import { Image } from 'react-native-elements'
import Button from '../components/Button.js';
import BackButtonHeader from '../components/BackButtonHeader'
import '../global'
import Color from '../constants/Color'
import request from '../functions/request'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    fontFamily:'Roboto-Bold',fontSize:40,color:Color.primaryColor, textAlign:'center',
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

class FindFriendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
      ],
      recommended: true,
    };
    this.searchString = '';
  }

  async sendRequest() {
    fetch(global.serverURL+"/api/find_friends", {
      method: 'POST',
      body: JSON.stringify({name: this.searchString}),
      headers: {
          authorization: this.props.user.token
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
        <View style={{ flex:1, width: '100%', alignItems:'center', justifyContent:'space-evenly'}}>
          <Text style={STYLES.title}>Find Friends</Text>
          <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
            <TextInput
              style={STYLES.search_box}
              onChangeText={text => {
                this.searchString = text;
                this.sendRequest.bind(this)()
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
            style={STYLES.roundedButton}
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
                global.serverURL + `/api/avatars/${user.user_id}.png`
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFriendsScreen);
