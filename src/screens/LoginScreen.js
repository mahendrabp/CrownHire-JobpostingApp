import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, Input, Layout} from 'react-native-ui-kitten';

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

  onChangeEmail = valueEmail => {
    let validationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validationRegex.test(valueEmail) === false) {
      this.setState({
        email: valueEmail,
        isEmailValid: false,
        invalidMessage: 'email tidak valid',
      });
    } else {
      this.setState({
        email: valueEmail,
        isEmailValid: true,
      });
    }
  };

  onChangePassword = valuePassword => {
    this.setState({password: valuePassword});
  };

  onSignIn = () => {
    this.setState({
      isLoading: true,
    });
  };

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
              onChangeText={valueEmail => this.onChangeEmail(valueEmail)}
              placeholder="Email"
              status={this.state.isEmailValid ? '' : 'danger'}
              caption={this.state.isEmailValid ? '' : this.state.invalidMessage}
            />
            <Input
              size="small"
              // style={styles.input}
              value={this.state.password}
              onChangeText={valuePassword =>
                this.onChangePassword(valuePassword)
              }
              placeholder="Password"
              secureTextEntry={true}
            />
            <Button
              style={styles.button}
              status="primary"
              onPress={() => this.onSignIn()}>
              SIGN IN
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
});

export default LoginScreen;
