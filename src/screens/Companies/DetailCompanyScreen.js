import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Button, Icon, Input, Spinner} from 'react-native-ui-kitten';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
} from 'native-base';
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
      <Container style={{marginTop: 50}}>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri: `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/public/logo/${this.state.logo}`,
                  }}
                />
                <Body>
                  <Text>{this.state.name}</Text>
                  <Text note>{this.state.location}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{
                  uri: `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/public/logo/${this.state.logo}`,
                }}
                style={{height: 200, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <View>
                <Text>{this.state.description}</Text>
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default DetailCompanyScreen;
