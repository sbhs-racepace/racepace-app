// Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import FeedRoute from '../components/FeedRoute';
import Button from '../components/Button';
import request from '../functions/request';
import '../global'
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const STYLES = StyleSheet.create({
  scrollView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor:Color.lightBackground,
  },
});

class PreviousRunsScreen extends React.Component {
  render() {
    if (!this.props.user.token) {
      return <Text>Please login to see your feed</Text>;
    }

    const test_data = (
      <ScrollView contentContainerStyle={STYLES.scrollView}>
        <FeedRoute
          from="Hyde Park"
          to="Circular Quay"
          postTime="10am"
          length="1"
        />
        <FeedRoute
          from="Hyde Park"
          to="Circular Quay"
          postTime="10am"
          length="1"
        />
        <FeedRoute
          from="Hyde Park"
          to="Circular Quay"
          postTime="10am"
          length="1"
        />
      </ScrollView>
    );

    return (
      <View style={{flex:1,backgroundColor:Color.lightBackground}}>
        <View style={{height:40}}>
          <Button
            text="Follow Requests"
            style={{height:"100%",width:"100%", backgroundColor:Color.darkBackground}}
            text_style={{color: Color.offColor, padding:"3%"}}
            onPress={() => this.props.navigation.navigate('FollowRequests')}
          />
        </View>
        {
          // this.props.user.runs.map(route=>
          // <FeedRoute
          //   from={route.real_time_route.route.from}
          //   to={route.real_time_route.route.to}
          //   postTime={route.real_time_route.start_time}
          //   length={route.real_time_route.route.distance}
          // />)
        }
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviousRunsScreen);
