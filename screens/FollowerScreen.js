// Jason Yu

import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image, Card, ListItem } from 'react-native-elements'
import "../global.js"
import Color from '../constants/Color'
import { connect } from 'react-redux';
import Button from '../components/Button.js'
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  card: {
    backgroundColor: Color.lightBackground,
    borderColor: Color.darkBackground,
    color: Color.textColor,
    margin: 10,
    },
  total_view : {
    padding:"3%", 
    backgroundColor:Color.lightBackground
  },
  text: {
    color: Color.textColor,
    fontSize:20,
  },
  profile_image: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    borderRadius: windowWidth * 0.2 / 2,
  },  
  roundedButton: {
    width: '20%',
    borderRadius: 10,
  },
  circularButton:{
    margin:5,
    borderWidth:1,
    backgroundColor:Color.darkBackground,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  largeButton: {
    width: windowWidth * 0.20,
    height: windowWidth * 0.20,
    borderRadius: windowWidth * 0.20 / 2,
  }, 
  smallButton: {
    width: windowWidth * 0.10,
    height: windowWidth * 0.10,
    borderRadius: windowWidth * 0.10 / 2,
  },
  largeIcon: windowWidth * 0.2 / 2,
  smallIcon: windowWidth * 0.12 / 2,
});



class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      other_user_id: this.props.other_user_id,
      username: 'loading',
    }
  }

  async get_details() {
    let data = {other_user_id:this.state.other_user_id}
    await fetch(
      global.serverURL+'/api/get_other_info', 
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Authorization': this.props.user_token})
      })
    .catch(res => {
      Alert.alert('Error connecting to server', res);
    })
    .then(
      async res_data => {
        res_data = await res_data.json()
        if (res_data.success == true) {
          username = res_data.info.username
          full_name = res_data.info.full_name
          this.setState({full_name:full_name});
          this.setState({username:username, bio:res_data.info.bio});
        } else {
          Alert.alert("Couldn't retrieve other user info");
        }
      }
    );
  }

  async componentDidMount() {
    await this.get_details()
  }

  render() {
    return (
        <Card 
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}
      >

        <ListItem
          title={this.state.username}
          subtitle={this.state.bio}
          onPress={() => this.goToUserProfile(this.state.other_user_id)}
          leftAvatar={{ source: { uri: global.serverURL + `/api/avatars/${this.state.other_user_id}.png` } }}
          titleStyle={{ color: Color.textColor, fontWeight: 'bold' }}
          subtitleStyle={{ color: Color.textColor }}
          containerStyle={{
              backgroundColor: Color.lightBackground,
            }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* <Button
                style={{width: '100%'}}
                text="View Profile"
                onPress={() => {
                this.goToUserProfile(this.state.other_user_id)
                }}
            >
            </Button> */}
        </View>
      </Card>
    )
  }
}

class FollowerScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your follow requests</Text>;
    }

    let test_data = this.props.user.followers.map(other_user_id => 
      <FollowRequest 
        other_user_id={other_user_id}
        user_token={this.props.user.token}
      />
    );


    return (
      <View style={{backgroundColor:Color.darkBackground, flex:1}}>
        <ScrollView contentContainerStyle={Color.lightBackground}>
          {test_data}
        </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowerScreen);
