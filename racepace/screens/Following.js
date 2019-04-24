import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button"
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'

class Follower extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const STYLES = StyleSheet.cerate({
      profile_image: { 
        height: 60, 
        width: 60, 
        borderRadius:30 
      },
    })
    return (
      <View style={{flexDirection: "row"}}>
        <Image
          style={STYLES.profile_image}
          source={this.props.img}
        />
        <Text>{this.props.name}</Text>
        {this.props.removeBtn && <Button text="Remove"/>}
      </View>
    )
  }
}

class FollowingScreen extends React.Component {
  constructor(state){
    super(state);
    this.state = {
      following: [
        {img: require('../assets/cat.jpeg'), name: "John F"},
        {img: require('../assets/cat.jpeg'), name: "John G"},
        {img: require('../assets/cat.jpeg'), name: "John H"},        
      ]
    }
  }
  render() {
    return (
      <View>
        {this.state.following.map(e=>{<Follower img={e.img} name={e.name}/>})}
      </View>
    )
  }
}

class FollowerScreen extends React.Component {
  constructor(state){
    super(state);
    this.state = {
      following: [
        {img: require('../assets/cat.jpeg'), name: "John F"},
        {img: require('../assets/cat.jpeg'), name: "John G"},
        {img: require('../assets/cat.jpeg'), name: "John H"},        
      ]
    }
  }
  render() {
    return (
      <View>
        {this.state.following.map(e=>{<Follower img={e.img} name={e.name}/>})}
      </View>
    )
  }
}

export class FollowListScreen extends React.Component {
  render() {
    const Nav = createMaterialTopTabNavigator({
      Following: FollowingScreen,
      Follower: FollowerScreen,
    })
    const AppContainer = createAppContainer(Nav);
    return (
      <AppContainer />
    )
  }
}