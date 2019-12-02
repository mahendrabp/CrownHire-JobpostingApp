import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import {Button, Input, Icon, Text} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {WaveIndicator} from 'react-native-indicators';
import imageLogin from '../assets/characterLogin.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmailValid: true,
      invalidMessage: '',
      isLoading: false,
      value: '',
      secureTextEntry: true,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  async checkAuth() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.props.navigation.replace('Home');
    }
    // console.log(token);
  }
  onChangeEmail = value => {
    let validationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validationRegex.test(value) === false) {
      this.setState({
        email: value,
        isEmailValid: false,
        invalidMessage: 'email tidak valid',
      });
    } else {
      this.setState({
        email: value,
        isEmailValid: true,
      });
    }
  };

  onChangePassword = value => {
    this.setState({password: value});
  };

  onSignIn = () => {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    const url =
      'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/users/login';
    const payload = {
      email,
      password,
    };

    setTimeout(async () => {
      await axios
        .post(url, payload)
        .then(response => {
          // console.log(response);
          if (response.data.status == 500 || response.data.status == 400) {
            ToastAndroid.show(
              response.data.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            this.setState({
              isLoading: false,
            });
          }
          // console.log(response);
          if (response.data.status == 200) {
            // console.log(response);

            AsyncStorage.setItem('token', response.data.token);
            this.props.navigation.navigate('Home');
            ToastAndroid.showWithGravityAndOffset(
              'Selamat Datang!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            this.setState({
              isLoading: false,
            });
          }
        })
        .catch(error => {
          // console.log(error);
          this.setState({isLoading: false});
          ToastAndroid.showWithGravityAndOffset(
            'Email/Password tidak valid',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        });
    }, 1000);
  };

  _renderBtnSignIn = () => {
    if (this.state.isLoading == true) {
      return <WaveIndicator color="#3C82FF" />;
    } else {
      return (
        <Button
          style={styles.button}
          status="primary"
          icon={StarIcon}
          onPress={this.onSignIn}>
          MASUK
        </Button>
      );
    }
  };

  _renderIcon = style => {
    const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
    return <Icon {...style} name={iconName} />;
  };

  onIconPress = () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({secureTextEntry});
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView style={styles.containerScrollView}>
            <View>
              <View style={{alignItems: 'center'}}>
                <Text category="h4" style={styles.title}>
                  MASUK
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image source={imageLogin} />
              </View>
              <Input
                size="small"
                icon={EmailIcon}
                // style={styles.input}
                value={this.state.email}
                onChangeText={value => this.onChangeEmail(value)}
                placeholder="Email"
                status={this.state.isEmailValid ? '' : 'danger'}
                caption={
                  this.state.isEmailValid ? '' : this.state.invalidMessage
                }
              />
              {/* <Input
                size="small"
                // style={styles.input}
                icon={this.renderIcon}
                value={this.state.password}
                onChangeText={value => this.onChangePassword(value)}
                placeholder="Password"
                secureTextEntry={true}
              /> */}
              <Input
                size="small"
                value={this.state.password}
                placeholder="Password"
                icon={this._renderIcon}
                secureTextEntry={this.state.secureTextEntry}
                onIconPress={this.onIconPress}
                onChangeText={value => this.onChangePassword(value)}
              />
              {this._renderBtnSignIn()}
              <View
                style={{
                  marginTop: 18,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text>Belum punya akun ? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.textPurple}>Daftar Disini.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const StarIcon = style => <Icon {...style} name="log-in-outline" />;
const EmailIcon = style => <Icon {...style} name="email" />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 18,
    color: '#4a4a4a',
    fontFamily: 'Montserrat-Bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    marginTop: 24,
  },
  containerScrollView: {
    paddingHorizontal: 12,
  },
  textDanger: {
    color: '#f5365c',
  },
  textPurple: {
    color: '#3C82FF',
  },
});

export default LoginScreen;
