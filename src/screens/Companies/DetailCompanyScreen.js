import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Button, Icon, Input, Spinner} from 'react-native-ui-kitten';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {H2, H3, Header, CardItem, Card} from 'native-base';
import rupiah from 'rupiah-format';

class DetailCompanyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   id: '',
      //   job: '',
      //   description: '',
      //   logo: '',
      //   company: '',
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.setState({
      // id: navigation.getParam('id'),
      name: navigation.getParam('name'),
      description: navigation.getParam('description'),
      //   salary: navigation.getParam('salary'),
      logo: navigation.getParam('logo'),
      //   company: navigation.getParam('company'),
      location: navigation.getParam('location'),
    });
  }
  render() {
    return (
      <View>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#ccc',
    // marginVertical: 5,
  },
  title: {
    color: '#fff',
    width: '100%',
    padding: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 20,
    fontWeight: 'bold',
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  content: {
    marginTop: -5,
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  btnAction: {
    padding: 0,
    marginVertical: 25,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  textCompany: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  textDescription: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    marginBottom: 10,
  },
});

export default DetailCompanyScreen;
