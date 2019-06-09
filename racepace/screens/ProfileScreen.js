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
    backgroundColor: global.colors.lightBackground
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
    color:global.colors.textColor
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
      statistics: {
        fastest_100: 9.4,
        total_distance_run: 100,
        fastest_800: 120,
        v02_max: 56,
        average_pace: 3.4,
      },
      imageurl: '../assets/cat.jpeg',
      screenVariable: true,
      bio: 'Hi! My name is Jason and I am not a runner. I am 58 :)',
    };
  }

  showCurrentScreen() {
    if (this.state.screenVariable) {
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
            }}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                style={STYLES.profile_image}
                source={{uri: `${global.serverURL}/api/avatars/${global.login_status.user_id}.png`}}
              />
              <Text style={[STYLES.text,{fontSize:20}]}>{this.state.name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'space-evenly',
              }}>
              <View style={{ flexDirection: 'row', flex: 2}}>
                <Button 
                  style={{ flex: 1, margin: 1 }} 
                  text={`${global.user.stats.points} Pace Points`}
                  onPress={() => this.props.navigation.navigate('Level')}
                />
                <Button
                  style={{ flex: 1, margin: 1 }}
                  text={`${global.user.following.length} Following`}
                  onPress={() => this.props.navigation.navigate('FollowList', {screen: "Following"})}
                />
                <Button
                  style={{ flex: 1, margin: 1 }}
                  text={`${global.user.followers.length} Followers`}
                  onPress={() => this.props.navigation.navigate('FollowList', {screen: "Followers"})}
                />
              </View>
              <Button style={{ flex: 1, width:'100%'}}
                text="Edit Profile"
                onPress={()=>{console.log(global.login_status.success)
                  this.props.navigation.navigate("Edit")}}
                disabled={!global.login_status.success && !global.TEST}
              />
            </View>
          </View>
        </View>
        <Text multiline={true} style={[STYLES.text, {padding:"2%"}]}>Bio: {this.state.bio}</Text>
        <View style={{ flexDirection: 'column', flex: 1, padding: '3%' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Button
              style={{ flex: 1 }}
              text="Stats"
              onPress={() => {
                this.setState({
                  screenVariable: true,
                });
              }}
            />
            <Button
              style={{ flex: 1 }}
              text="Runs"
              onPress={() => {
                this.setState({
                  screenVariable: false,
                });
              }}
            />
          </View>
          <View style={{ flex: 7 }}>{this.showCurrentScreen()}</View>

          <Button text="Find Friends"
            style={{width:'100%'}}
            onPress={() => this.props.navigation.navigate('FindFriends')}
           />
          <Button
            style={{width:'100%'}}
            text={global.login_status.success ? "Logout" : "Login or Register as New"}
            onPress={() => {
              if (global.login_status.success) {
                global.socket.emit('disconnect')
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
