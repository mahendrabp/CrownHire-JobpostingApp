import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Button, Input, Layout} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmailValid: true,
      invalidMessage: '',
      isLoading: '',
    };
  }

  componentDidMount() {}

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
    const url = 'http://10.0.2.2:5200/api/v1/users/login/';
    const payload = {
      email,
      password,
    };
    axios
      .post(url, payload)
      .then(response => {
        console.log(response);
        AsyncStorage.setItem('token', response.data.token);
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        this.setState({isLoading: false});
        ToastAndroid.showWithGravityAndOffset(
          'Invalid Username/Password!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  _renderButtonSubbmit = () => {};

  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView style={styles.containerScrollView}>
            <View>
              <Text style={styles.title}>CROWNHIRE</Text>
            </View>
            <Input
              size="small"
              // style={styles.input}
              value={this.state.email}
              onChangeText={value => this.onChangeEmail(value)}
              placeholder="Email"
              status={this.state.isEmailValid ? '' : 'danger'}
              caption={this.state.isEmailValid ? '' : this.state.invalidMessage}
            />
            <Input
              size="small"
              // style={styles.input}
              value={this.state.password}
              onChangeText={value => this.onChangePassword(value)}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Button
              type="submit"
              style={styles.button}
              status="primary"
              onPress={this.onSignIn}>
              MASUK
            </Button>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 18,
                justifyContent: 'center',
              }}>
              <Text>Belum punya akun ? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.textDanger}>Register here.</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

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
});

export default LoginScreen;
