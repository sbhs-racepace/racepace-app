// Sunny Yan, Jason Yu

import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image } from 'react-native-elements'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import Button from "../components/Button"
import BackButtonHeader from '../components/BackButtonHeader'
import Color from '../constants/Color'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

class Follower extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const STYLES = StyleSheet.create({
      profile_image: { 
        height: windowWidth * 0.2, 
        width: windowWidth * 0.2 , 
        borderRadius:windowWidth * 0.2 / 2, 
      },
    })
    return (
      <View style={{width:'100%',flexDirection: "row",justifyContent:'space-around', height:windowWidth * 0.25, alignItems:'center'}}>
        <Image
          style={STYLES.profile_image}
          source={this.props.img}
        />
        <Text style={{width:"30%",fontSize:20, color:Color.textColor}}>{this.props.name}</Text>
        {this.props.unfollowBtn && <Button style={{width:'20%'}} text="Unfollow"/>}
        {this.props.removeBtn && <Button style={{width:'20%'}} text="Remove"/>}
      </View>
    )
  }
}

class FollowingScreen extends React.Component {
  constructor(props){
    super(props);
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
      <View style={{backgroundColor:Color.lightBackground}}>
        {this.state.following.map(e=>{return <Follower img={e.img} name={e.name} unfollowBtn={true}/> })}
      </View>
    )
  }
}

class FollowerScreen extends React.Component {
  constructor(props){
    super(props);
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
      <View style={{backgroundColor:Color.lightBackground}}>
        {this.state.following.map(e=>{return <Follower img={e.img} name={e.name} removeBtn={true}/>})}
      </View>
    )
  }
}

export default class FollowListScreen extends React.Component {
  render() {
    const Nav = createMaterialTopTabNavigator({
      Following: {screen: FollowingScreen},
      Followers: {screen: FollowerScreen},
    }, {
      initialRouteName: this.props.navigation.state.params==undefined ? "Following" : this.props.navigation.state.params.screen,
      tabBarOptions: {
        activeTintColor: Color.textColor,
        indicatorStyle: {
            backgroundColor: Color.primaryColor
        },
        inactiveTintColor: Color.offColor,
        style: { backgroundColor: Color.buttonColor }
      }
    })
    const AppContainer = createAppContainer(Nav);
    return (
      <View style={{flex: 1, backgroundColor:Color.lightBackground}}>
      <BackButtonHeader
        onPress={this.props.navigation.goBack}
        title={this.props.navigation.state.routeName}
      />
      <AppContainer style={{flex:1}}/>
      </View>
    )
  }
}