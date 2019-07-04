// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import { Card } from 'react-native-elements'
import "../global.js"
import Color from '../constants/Color'


const STYLES = StyleSheet.create({

  route_item: {
    padding:"3%",
    borderWidth:5,
    backgroundColor: Color.lightBackground,
    borderColor: Color.darkBackground,
    borderStyle:"solid",
    flexDirection:"column",
  },  
  text: {
    fontSize:15,
    padding:"3%",
    color:Color.textColor
  },
  card: {
      backgroundColor: Color.lightBackground,
      borderColor: Color.darkBackground,
      color: Color.textColor,
      margin: 5,
      marginBottom: 5,
  }
})

class RouteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card 
        title={this.props.route.start + " to " + this.props.route.end}
        titleStyle={{color: Color.textColor}}
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}>
        <Text style={STYLES.text}>{this.props.route.dist}km</Text>
      </Card>
    )
  }
}

export default class RouteListScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let routes = global.user_routes.map(route => <RouteItem route={route}/>);
    return (
      <View style={{backgroundColor: Color.darkBackground, padding: 10}}>
        {routes}
      </View>
    );
  }
}