// Jason Yu

import React from 'react'
import { View, AsyncStorage, StatusBar, Alert, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import '../global'
import * as Font from 'expo-font'
import { getUserInfo } from '../functions/login'
import Color from '../constants/Color'
import * as Permissions from 'expo-permissions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeLoginInfo, storeUserInfo } from '../functions/user_info_action'

class StartupScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  async componentDidMount () {
    console.disableYellowBox = true
    StatusBar.setBarStyle('light-content', true);
    global.location_permission = Boolean((await Permissions.askAsync(Permissions.LOCATION)).status)
    await Font.loadAsync({
      'RobotoCondensed-BoldItalic': require('../assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
      'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    })
    let login_info = await AsyncStorage.getItem('login_info')
    if (login_info !== null) {
      // Storing Login Info
      let json_login_info = JSON.parse(login_info)
      await this.props.storeLoginInfo(json_login_info)
      // Storing User Info
      let user_info =  await getUserInfo(this.props.user.token);
      if (!user_info) {
        Alert.alert("Error","Due to the previous error, we couldn't log you in automatically. Please try logging in manually.")
        this.props.navigation.navigate('Splash');
        return 0; //Early exit
      }
      this.props.storeUserInfo(user_info);
      this.props.navigation.navigate('Feed');
    } else {
      this.props.navigation.navigate('Splash');
    }
  }

  render () {
    return (
      <View style={{flex:1}}>
        <LinearGradient
          colors={[Color.darkBackground, Color.primaryColor]}
          style={{flex:1}}
        >
          <Text style={{textAlign:'center', justifyContent:'center',color:'white'}}>Loading...</Text>
        </LinearGradient>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ storeUserInfo, storeLoginInfo }, dispatch)
}


function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen);
