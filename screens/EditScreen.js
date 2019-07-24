// Calvin Chang

import React from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import * as DocumentPicker from 'expo-document-picker'
import {
  View,
  Alert,
  Text,
  ScrollView,
  AppRegistry,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import TextInput from '../components/TextInput';
import { Image } from 'react-native-elements';
import { login } from '../functions/login';
import Button from '../components/Button';
import BackButtonHeader from '../components/BackButtonHeader';
import Color from '../constants/Color';
import '../global.js';
import { updateUserInfo } from '../functions/user_info_action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
  chsfile: {
    width: 80,
    height: 30,
    borderRadius: 10,
    alignSelf: 'center',
  },
  input: {
    width: windowWidth * 0.8,
    marginTop: 5,
  },
  profile_image: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    borderRadius: (windowWidth * 0.3) / 2,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Color.lightBackground,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  saveButton: {
    width: '80%',
    fontSize: 14,
    alignSelf: 'center',
  },
});

class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: global.serverURL + `/api/avatars/${this.props.user.user_id}.png`,
      new_username: '',
      new_password: '',
      bio: '',
      full_name: '',
      image: '',
      current_password: '',
      confirmation_password: '',
    };
    this.base64 = false;
  }

  async saveChanges() {
    if (
      this.state.current_password != '' &&
      this.state.current_password == this.state.new_password
    ) {
      Alert.alert('New password and Old password are the same');
      return 0;
    }
    if (this.state.current_password == '') {
      Alert.alert('Current Password required');
      return 0;
    }
    if (this.state.new_password != this.state.confirmation_password) {
      Alert.alert("New Password doesn't match with Confirmation Password");
      return 0;
    }
    if (
      this.state.current_password != '' &&
      this.state.new_username == '' &&
      this.state.new_password == '' &&
      this.state.confirmation_password == '' &&
      this.state.full_name == '' &&
      this.state.bio == '' &&
      this.state.uri == null
    ) {
      Alert.alert('No changes made');
      return 0;
    }

    let data = {
      username: this.state.new_username,
      password: this.state.new_password,
      bio: this.state.bio,
      full_name: this.state.full_name,
    };
    let login_data = await login(
      this.props.user.email,
      this.state.current_password
    );
    let not_changing_password = (this.state.confirmation_password == '' && this.state.new_password == '')
    let equivalent_new = this.state.new_password == this.state.confirmation_password;

    if (login_data.success) {
      if (equivalent_new || not_changing_password)  {
        fetch(global.serverURL + '/api/update_profile', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            Authorization: this.props.user.token,
          }),
        })
        .catch(res => {
          Alert.alert('Error connecting to server', res);
        })
        .then(async res => {
          res = await res.json();
          if (res.success == true) {
            let updated_data = {username: data.username, bio: data.bio, full_name: data.full_name}
            await this.props.updateUserInfo(updated_data);
            Alert.alert('Changed User Details. These changes may take a while to sync.');
            this.props.navigation.navigate('Profile');
          } else {
            Alert.alert(res.error);
          }
        });
        
        if (this.base64 != false) {
          fetch(global.serverURL + '/api/avatars/update', {
            method: 'PATCH',
            body: this.base64,
            headers: new Headers({
              Authorization: this.props.user.token,
            }),
          })
          .catch(res => {
            Alert.alert('Error connecting to server', res);
          })
          .then(async res => {
            res = await res.json();
            if (res.success == true) {
              Alert.alert('Image upload success. These changes will not update until restart.');
            } else {
              Alert.alert(res.error);
            }
          });
        }
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.lightBackground }}>
        <BackButtonHeader
          title="Edit Screen"
          onPress={this.props.navigation.goBack}
        />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flex: 2 / 5 }}>
              <Image
                key={Math.random()}
                style={STYLES.profile_image}
                source={{
                  uri: this.state.uri,
                }}
              />
              <Button
                text="Choose File"
                style={STYLES.chsfile}
                onPress={async () => {
                  let { uri, type } = await DocumentPicker.getDocumentAsync({
                    type: 'image/*',
                  });
                  if (type == 'success') {
                    let result = await ImageManipulator.manipulateAsync(
                      this.state.uri,
                      [{resize: {width:256}}],
                      {
                        base64: true,
                        format: ImageManipulator.SaveFormat.PNG,
                      }
                    );
                    this.setState({uri: result.uri})
                    this.base64 = result.base64;
                  }
                }}
              />
            </View>
            <View style={{ flex: 3 / 5 }}>
              <TextInput
                placeholder="Name"
                autoCapitalize={false}
                defaultValue={''}
                style={{ ...STYLES.input, width: windowWidth * 0.5 }}
                returnKeyType="go"
                onChangeText={full_name => this.setState({ full_name })}
              />
              <TextInput
                placeholder="Enter Bio"
                defaultValue={''}
                onChangeText={bio => this.setState({ bio })}
                style={{ ...STYLES.input, width: windowWidth * 0.5 }}
                text_style={{
                  height: windowWidth * 0.3,
                  fontSize: 12,
                  width: windowWidth * 0.5,
                }}
                returnKeyType="go"
                multiline={true}
              />
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              height: windowHeight * 0.8,
            }}>
            <TextInput
              style={STYLES.input}
              placeholder="New Username"
              defaultValue={''}
              returnKeyType="go"
              onChangeText={new_username => this.setState({ new_username })}
            />
            <View>
              <TextInput
                placeholder="Current Password"
                defaultValue={''}
                style={STYLES.input}
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="go"
                onChangeText={current_password =>
                  this.setState({ current_password })
                }
              />
              <Text style={{ fontSize: 12, color: 'red' }}>*Required</Text>
            </View>
            <TextInput
              placeholder="New Password"
              defaultValue={''}
              style={STYLES.input}
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="go"
              onChangeText={new_password => this.setState({ new_password })}
            />
            <TextInput
              placeholder="New Password Confirmation"
              style={STYLES.input}
              defaultValue={''}
              secureTextEntry={true}
              autoCapitalize="none"
              returnKeyType="go"
              onChangeText={confirmation_password =>
                this.setState({ confirmation_password })
              }
            />
            <Button
              text="Save Changes"
              style={STYLES.saveButton}
              onPress={async () => {
                await this.saveChanges();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUserInfo }, dispatch);
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScreen);
