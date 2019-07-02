// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import "../global.js"
import Color from '../constants/Color'

const STYLES = StyleSheet.create({

  route_item: {
    padding:"3%",
    margin:"3%",
    borderWidth:1,
    borderColor:"black",
    borderStyle:"solid",
    borderRadius:20,
    flexDirection:"column",
  },  
  text: {
    fontSize:15,
    padding:"3%",
    color:Color.textColor
  }
})

class RouteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLES.route_item}>
        <Text style={STYLES.text}>{this.props.route.start} to {this.props.route.end}</Text>
        <Text style={STYLES.text}>{this.props.route.dist}km</Text>
      </View>
    )
  }
}

export default class RouteListScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  
  render() {
    let routes = global.user_routes.map(route => <RouteItem route={route}/>);
    return (
      <View>
        {routes}
      </View>
    );
  }
}