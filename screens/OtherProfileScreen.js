// Jason Yu and Abdur Raqeeb Mohammed

import React from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert, ScrollView, KeyboardAvoidingView, Dimensions} from 'react-native'
import { Image, Icon } from 'react-native-elements'
import Button from '../components/Button'
import '../global'
import '../assets/cat.jpeg'
import BackButtonHeader from '../components/BackButtonHeader'
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  profile_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    paddingRight: '1%',
    alignSelf:'center',
  },
  text: {
    fontSize: 15,
    color: Color.textColor,
  },
  stat_btn: {
    backgroundColor: 'transparent',
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderLeftWidth: 2,
    borderLeftColor: Color.lightBackground,
    width:'30%'
  }
})

class OtherProfileScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let info = this.props.navigation.state.params['info']
    let user_id = this.props.navigation.state.params['user_id']
    console.log(info)

    return (
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
        <BackButtonHeader
          onPress={this.props.navigation.goBack}
          title='Profile'
        />
        <View style={{backgroundColor:Color.lightBackground, height:300}}>
          <Text style={[STYLES.text, { fontSize: 30, textAlign: 'center', paddingTop: '5%', fontFamily:'Roboto-Bold', color:Color.primaryColor}]}>{info.full_name}</Text>
          <View style={{ height: 150, padding: '3%', flexDirection:'row'}}>
            <View style={{flexDirection: 'row',flex: 1,alignItems: 'center'}}>
              <Image
                key={Math.random()}
                style={STYLES.profile_image}
                source={{
                uri: `${global.serverURL}/api/avatars/${user_id}.png`
                }}
              />
            </View>

            <View 
              style={{
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'space-evenly',
              }}
            >
              <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                <Button
                  style={STYLES.stat_btn}
                  text={`${info.stats.points} points`}
                />
                <Button
                  style={STYLES.stat_btn}
                  text={`${info.following.length} Following`}
                />
                <Button
                  style={STYLES.stat_btn}
                  text={`${info.followers.length} Followers`}
                />
              </View>

              <Button
                style={STYLES.stat_btn}
                text={`${info.followers.length} Follow/Unfollow`}
              />
            </View>
          </View>
          <Text multiline={true} style={[STYLES.text,{margin:"4%", marginTop:0}]}>Bio: {info.bio}</Text>
        </View>        
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfileScreen);
