// Sunny Yan, Jason Yu

import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import FollowerScreen from './FollowerScreen'
import FollowingScreen from './FollowingScreen'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import BackButtonHeader from '../components/BackButtonHeader'
import Color from '../constants/Color'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

class FollowListScreen extends React.Component {
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowListScreen);
