import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import {Button, Text, Input, Icon} from 'react-native-ui-kitten';
import {WaveIndicator} from 'react-native-indicators';
import axios from 'axios';
import imageRegist from '../assets/characterRegist.png';
import {connect} from 'react-redux';
import {registerUser} from '../redux/action/auth';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      retypePassword: '',
      isEmailValid: true,
      isPasswordValid: true,
      value: '',
      secureTextEntry: true,
    };
  }

  onChangeEmail = value => {
    let validationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validationRegex.test(value) === false) {
      this.setState({
        email: value,
        isEmailValid: false,
        invalidMessage: 'email tidak valid',
      });
    } else if (value === '' || value === null) {
      this.setState({
        email: value,
        isEmailValid: false,
        invalidMessage: 'email tidak boleh kosong',
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

  onSignUp = () => {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    // const url =
    //   'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/users/register';
    // const payload = {
    //   email,
    //   password,
    // };

    setTimeout(async () => {
      try {
        await this.props.dispatch(registerUser({email, password}));
        if (this.props.auth.status != 200) {
          ToastAndroid.show(
            this.props.auth.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          this.setState({
            isLoading: false,
          });
        }
        if (this.props.auth.status == 200) {
          // console.log(response);
          // AsyncStorage.setItem('token', response.data.token);
          this.props.navigation.navigate('Login');
          ToastAndroid.showWithGravityAndOffset(
            'Berhasil mendaftar',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          this.setState({
            isLoading: false,
          });
        }
      } catch (error) {
        this.setState({isLoading: false});
        ToastAndroid.showWithGravityAndOffset(
          this.props.auth.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
      // axios
      //   .post(url, payload)
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status != 200) {
      //       ToastAndroid.show(
      //         response.data.message,
      //         ToastAndroid.LONG,
      //         ToastAndroid.BOTTOM,
      //       );
      //       this.setState({
      //         isLoading: false,
      //       });
      //     }
      //     if (response.data.status == 200) {
      //       console.log(response);
      //       // AsyncStorage.setItem('token', response.data.token);
      //       this.props.navigation.navigate('Login');
      //       ToastAndroid.showWithGravityAndOffset(
      //         'Berhasil mendaftar',
      //         ToastAndroid.LONG,
      //         ToastAndroid.BOTTOM,
      //         25,
      //         50,
      //       );
      //       this.setState({
      //         isLoading: false,
      //       });
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.setState({isLoading: false});
      //     ToastAndroid.showWithGravityAndOffset(
      //       'Invalid Username/Password!',
      //       ToastAndroid.LONG,
      //       ToastAndroid.BOTTOM,
      //       25,
      //       50,
      //     );
      //   });
    }, 1000);
  };

  // onSignUp = () => {
  //   this.setState({isLoading: true});
  //   const {email, password} = this.state;
  //   const url = 'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/users/register';
  //   const payload = {
  //     email,
  //     password,
  //   };

  //   axios
  //     .post(url, payload)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch();
  // };

  _renderBtnSignUp = () => {
    if (this.state.isLoading == true) {
      return <WaveIndicator color="#3C82FF" />;
    } else {
      return (
        <Button
          style={styles.button}
          appearance="outline"
          status="primary"
          onPress={this.onSignUp}>
          DAFTAR
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
          <ScrollView style={styles.scrollView}>
            <View>
              <View style={{alignItems: 'center'}}>
                <Text category="h5" style={styles.title}>
                  DAFTAR
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image source={imageRegist} />
              </View>
              <Input
                size="small"
                style={styles.input}
                value={this.state.email}
                onChangeText={value => this.onChangeEmail(value)}
                placeholder="Email"
                status={this.state.isEmailValid ? '' : 'danger'}
                caption={this.state.isEmailValid ? '' : 'Email invalid'}
                icon={EmailIcon}
              />
              <Input
                size="small"
                style={styles.input}
                value={this.state.password}
                onChangeText={value => this.onChangePassword(value)}
                placeholder="Password"
                icon={this._renderIcon}
                secureTextEntry={this.state.secureTextEntry}
                onIconPress={this.onIconPress}
              />

              {/* <Button
              style={styles.button}
              appearance="outline"
              status="primary"
              onPress={this.onSignUp}>
              DAFTAR
            </Button> */}
              {this._renderBtnSignUp()}

              <View
                style={{
                  marginTop: 18,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text>Sudah punya akun ? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.textPurple}>Masuk Disini.</Text>
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
  scrollView: {
    paddingRight: 12,
    paddingLeft: 12,
  },
  input: {
    marginHorizontal: 4,
    marginTop: 8,
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
    marginTop: 24,
  },
  title: {
    marginBottom: 18,
    color: '#4a4a4a',
    fontFamily: 'Montserrat-Bold',
    alignContent: 'center',
    alignItems: 'center',
  },
  textDanger: {
    color: '#f5365c',
  },
  textPurple: {
    color: '#3C82FF',
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RegisterScreen);
