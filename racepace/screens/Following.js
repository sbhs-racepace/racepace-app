import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button"
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'

class Follower extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const STYLES = StyleSheet.create({
      profile_image: { 
        height: 60, 
        width: 60, 
        borderRadius:30 
      },
    })
    return (
      <View style={{flexDirection: "row", justifyContent: "space-between",height:70,padding:"2%"}}>
        <Image
          style={STYLES.profile_image}
          source={this.props.img}
        />
        <Text style={{width:"70%"}}>{this.props.name}</Text>
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
        {this.state.following.map(e=>{return <Follower img={e.img} name={e.name}removeBtn={true}/> })}
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
        {this.state.following.map(e=>{return <Follower img={e.img} name={e.name}/>})}
      </View>
    )
  }
}

export default class FollowListScreen extends React.Component {
  render() {
    const Nav = createMaterialTopTabNavigator({
      Following: {screen: FollowingScreen},
      Followers: {screen: FollowerScreen},
    }, {initialRouteName: this.props.navigation.state.params==undefined ? "Following" : this.props.navigation.state.params.screen})
    const BACK_BTN = {
      width: 40,
      height: "5%",
      left: 5,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    }
    const AppContainer = createAppContainer(Nav);
    return (
      <View style={{flex: 1}}>
      <Button text="Back" onPress={()=>this.props.navigation.goBack()} style={BACK_BTN} />
      <AppContainer style={{flex:1}}/>
      </View>
    )
  }
}