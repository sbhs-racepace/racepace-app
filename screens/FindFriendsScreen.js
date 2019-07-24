import React from 'react';
import { Component } from 'react';
import { Alert, View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import TextInput from '../components/TextInput'
import { Image, SearchBar, ListItem } from 'react-native-elements'
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
      searchString: "",
      searchResults: [
      ],
      recommended: true,
    };
  }

  async sendRequest(text) {
    this.setState({showLoading: true})
    let api_url = global.serverURL+"/api/find_friends"
    let data = {name: text}
    await fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({'Authorization': this.props.user.token})
    })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res => {
        res = await res.json(); //Parse response as JSON
        this.setState({searchResults: res, showLoading: false});
      }
    );
  }

  async goToUserProfile(user) {
    if (user.user_id == this.props.user.user_id) {
      this.props.navigation.navigate('Profile')
      return
    }

    await fetch(
      global.serverURL+'/api/get_other_info', 
      {
        method: 'POST',
        headers: new Headers({'Authorization': this.props.user.token})
      })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res => {
        res = await res.json(); //Parse response as JSON
        let info = res['info']
        this.props.navigation.navigate('OtherProfile', {info:info, user_id: user.user_id})
      }
    );
  }

  showUsers() {
    if (this.state.searchResults.length != 0) {
        return this.state.searchResults.map(user => (
        <ListItem
          title={user.name}
          subtitle={user.bio}
          onPress={() => this.goToUserProfile(user)}
          leftAvatar={{ source: { uri: global.serverURL + `/api/avatars/${user.user_id}.png` } }}
          titleStyle={{ color: Color.textColor, fontWeight: 'bold' }}
          subtitleStyle={{ color: Color.textColor }}
          containerStyle={{
              backgroundColor: Color.lightBackground,
            }}
        />
      ))
    } else if (this.state.searchString != '' && !this.state.showLoading){
        return ( 
        <ListItem
        subtitle="No results found"
        subtitleStyle={{ color: Color.textColor }}
        containerStyle={{
            backgroundColor: Color.lightBackground,
          }}
      />
        )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 , backgroundColor:Color.darkBackground}}>
        <BackButtonHeader
          onPress={this.props.navigation.goBack}
          title='Find Friends'
        />
        <SearchBar
            placeholder="Type Here..."
            showLoading={this.state.showLoading}
            autoCapitalize="none"
            onChangeText={text => {
                this.setState({searchString: text})
                this.sendRequest.bind(this)(text)
                }}
            value={this.state.searchString}
            containerStyle={{
                backgroundColor: Color.lightBackground,
                borderBottomWidth: 0,
                borderTopWidth: 0,
            }}
            inputContainerStyle={{
                backgroundColor: Color.lightBackground2
            }}
        />
        <ScrollView style={{ width: '100%' }}>
          {this.showUsers()}
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
