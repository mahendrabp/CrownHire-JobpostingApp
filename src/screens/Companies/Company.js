import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import {Button, Input, Layout, Icon, Text} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {WaveIndicator} from 'react-native-indicators';
import notFoundImage from '../../assets/404notfound.png';

class LoginScreen extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <View
            style={{
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{width: 300, height: 300, marginBottom: 20}}
              source={notFoundImage}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Button>Kembali</Button>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'column',
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
