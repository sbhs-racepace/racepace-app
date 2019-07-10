// Jason Yu

import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import { Card } from 'react-native-elements'
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const STYLES = StyleSheet.create({
  text: {
    fontSize:15,
    padding:"3%",
    color:Color.textColor
  },
  card: {
      backgroundColor: Color.lightBackground,
      borderColor: Color.darkBackground,
      margin: 10,
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
        <Text style={STYLES.text}>Start Time: {this.props.route.start_time}</Text>
        <Text style={STYLES.text}>Distance: {this.props.route.dist}km</Text>
        <Text style={STYLES.text}>{this.props.route.description}</Text>
      </Card>
    )
  }
}

class RouteListScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // Conversion of Routes to being in array
    // list_saved_routes = [];
    // for (route_id in this.props.user.saved_routes) {list_saved_routes.push(this.props.user.saved_routes.route_id)};
    // let routes = list_saved_routes.map(route => <RouteItem route={route}/>);


    list_saved_routes = [1,2,3]
    let test_data = list_saved_routes.map(route => 
      <RouteItem 
        route={{
          name:'Bay Run', 
          start_time:'10am',
          distance:1, 
          start:{name:'Circular Quay'},
          end:{name:'Central'},
          description:"Very sunny run through the city",
        }}
      />
    );


    return (
      
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
          {test_data}
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteListScreen);
