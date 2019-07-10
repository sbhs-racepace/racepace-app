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
      color: Color.textColor,
      margin: 10,
  }
})

class SavedRunItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card 
        title={this.props.run.name}
        titleStyle={{color: Color.textColor}}
        dividerStyle={{display: 'none'}}
        containerStyle={STYLES.card}
      >
        <Text style={STYLES.text}>Start Time: {this.props.run.start_time}</Text>
        <Text style={STYLES.text}>Distance: {this.props.run.dist}km</Text>
        <Text style={STYLES.text}>Pace: {this.props.run.average_pace.minutes}:{this.props.run.average_pace.seconds}</Text>
        <Text style={STYLES.text}>Pace: {this.props.run.duration.minutes}:{this.props.run.duration.seconds}</Text>
        <Text style={STYLES.text}>{this.props.run.description}</Text>
      </Card>
    )
  }
}

class SavedRunListScreen extends React.Component {
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
      <SavedRunItem 
        run={{
          name:'PB mile run', 
          description:'Best run of my life 430 pace! :)',
          average_pace: {minutes:4,seconds:30},
          duration: {minutes:20,seconds:30},
          start_time:'10am',
          distance:1, 
        }}
      />
    );


    return (
      
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
        <ScrollView>
          {test_data}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedRunListScreen);
