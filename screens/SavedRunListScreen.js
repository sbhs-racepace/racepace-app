// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import { Card } from 'react-native-elements'
import Color from '../constants/Color'
import { logoutCall } from '../functions/user_info_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
        title={this.props.route.name}
        titleStyle={{color: Color.textColor}}
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}
      >
        <Text style={STYLES.text}>{this.props.route.start.name + " to " + this.props.route.end.name}</Text>
        <Text style={STYLES.text}>{this.props.route.dist}km</Text>
      </Card>
    )
  }
}

class SavedRunsListScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // Conversion of Routes to being in array
    list_saved_routes = [];
    for (route_id in this.props.user.saved_routes) {list_saved_routes.push(this.props.user.saved_routes.route_id)};
    let routes = list_saved_routes.map(route => <RouteItem route={route}/>);
    return (
      <View style={{backgroundColor: Color.darkBackground, padding: 10}}>
        {routes}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch)
}

function mapStateToProps(state) {
  const {user} = state
  return {user};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedRunsListScreen);
