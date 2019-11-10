import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Text, Input} from 'react-native-ui-kitten';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      retypePassword: '',
      isEmailValid: true,
      isPasswordValid: true,
    };
  }

  onChangeEmail = value => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(value) === false) {
      this.setState({
        email: value,
        isEmailValid: false,
      });
    } else {
      this.setState({
        email: value,
        isEmailValid: true,
      });
    }
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View>
              <Text category="h5" style={styles.title}>
                INI REGISTER SCREEN
              </Text>
            </View>
            <Input
              size="small"
              style={styles.input}
              value={this.state.email}
              onChangeText={value => this.onChangeEmail(value)}
              placeholder="Email"
              status={this.state.isEmailValid ? '' : 'danger'}
              caption={this.state.isEmailValid ? '' : 'Email invalid'}
            />
            <Input
              size="small"
              style={styles.input}
              value={this.state.password}
              onChangeText={this.onChangeText}
              placeholder="Password"
            />
            <Input
              size="small"
              style={styles.input}
              value={this.state.retypePassword}
              onChangeText={this.onChangeText}
              placeholder="Retype Password"
            />
            <Button style={styles.button} status="danger">
              REGISTER
            </Button>
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
  },
  textDanger: {
    color: '#f5365c',
  },
});
export default RegisterScreen;
