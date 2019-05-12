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
import '../assets/cat.jpeg';
import RouteListScreen from './RouteListScreen';
import StatsScreen from './StatsScreen';

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  profile_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  other_data_box: {
    padding: '3%',
  },
  text: {
    fontSize: 15,
  },
  button: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});

function logout() {
  global.login_status = {
    success: false,
    token: false,
    user_id: false,
  };
  global.user = {
    name: 'guest',
    username: 'guest',
    dob: 'None',
    routes: [],
  };
}

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: global.user.full_name,
      username: global.user.username,
      age: 16,
      email: global.user.email,
      statistics: {
        fastest_100: 9.4,
        total_distance_run: 100,
        fastest_800: 120,
        v02_max: 56,
        average_pace: 3.4,
      },
      imageurl: '../assets/cat.jpeg',
      showCancel: true,
    };
  }

  _renderCancel() {
    if (this.state.showCancel) {
      return <StatsScreen />;
    } else {
      return <RouteListScreen />;
    }
  }

  render() {
    return (
      <View style={STYLES.container}>
        <View style={{ height: 150, padding: '3%' }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                style={STYLES.profile_image}
                source={{uri: global.serverURL+"/api/get_user_image/"+global.login_status.user_id}}
              />
              <Text style={STYLES.text}>{this.state.name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', flex: 2 }}>
                <Button style={{ flex: 1 }} text="8 Pace Points" />
                <Button
                  style={{ flex: 1 }}
                  text="9 Following"
                  onPress={() => this.props.navigation.navigate('FollowList', {screen: "Following"})}
                />
                <Button
                  style={{ flex: 1 }}
                  text="3 Followers"
                  onPress={() => this.props.navigation.navigate('FollowList', {screen: "Followers"})}
                />
              </View>
              <Button style={{ flex: 1 }}
                text="Edit Profile"
                onPress={()=>{console.log(global.login_status.success)
                  this.props.navigation.navigate("Edit")}}
                disabled={!global.login_status.success && !global.TEST}
              />
            </View>
          </View>
        </View>
        <Text multiline={true} style={{ fontSize: 10, padding: '3%' }}>
          Hi! My name is Jason and I am not a runner. I am 58 :)
        </Text>

        <View style={{ flexDirection: 'column', flex: 1, padding: '3%' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Button
              style={{ flex: 1 }}
              text="Stats"
              onPress={() => {
                this.setState({
                  showCancel: true,
                });
              }}
            />
            <Button
              style={{ flex: 1 }}
              text="Runs"
              onPress={() => {
                this.setState({
                  showCancel: false,
                });
              }}
            />
          </View>
          <View style={{ flex: 7 }}>{this._renderCancel()}</View>

          <Button text="Find Friends"
            onPress={() => this.props.navigation.navigate('FindFriends')}
           />
          <Button
            text={global.login_status.success ? "Logout" : "Login or Register as New"}
            onPress={() => {
              if (global.login_status.success) {
                logout();
              } else {
                this.props.navigation.navigate('Splash');
              }
            }}
          />
        </View>
      </View>
    );
  }
}
