import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Text} from 'react-native-ui-kitten';
import axios from 'axios';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Body,
} from 'native-base';
import Modal from 'react-native-modal';

import notFoundImage from '../../assets/404notfound.png';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      isVisible: false,
    };
  }

  componentDidMount() {
    this.getCompany();
  }

  async getCompany() {
    const url = 'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies';
    await axios
      .get(url)
      .then(result => {
        const dataCompany = result.data.data;
        // console.log(result.data.data);
        this.setState({
          companies: dataCompany,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <ScrollView>
          <Card style={{marginVertical: 10}}>
            {this.state.companies.map(v => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DetailCompanyScreen', v)
                }>
                <View
                  key={v.id}
                  style={{
                    marginVertical: 20,
                    elevation: 10,
                    borderWidth: 1,
                    borderColor: '#fff',
                  }}>
                  <CardItem
                    style={{justifyContent: 'center'}}
                    onPress={() =>
                      this.props.navigation.navigate('CompanyDetailScreen', v)
                    }>
                    <View>
                      <Text
                        style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                        {v.name}
                      </Text>
                    </View>
                  </CardItem>
                  <CardItem cardBody style={{flex: 1}}>
                    <Image
                      source={{
                        uri: `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/public/logo/${v.logo}`,
                      }}
                      style={{height: 100, width: 100, flex: 1}}
                    />
                  </CardItem>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </ScrollView>
        <View>
          <Modal isVisible={this.state.isVisible}>
            <View style={{flex: 1}}>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/public/logo/`,
                      }}
                    />
                    <Body>
                      <Text>NativeBase</Text>
                      <Text note>GeekyAnts</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/public/logo/`,
                    }}
                    style={{height: 200, width: null, flex: 1}}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Text>12 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>11h ago</Text>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Company;
