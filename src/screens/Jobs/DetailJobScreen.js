import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Text,
} from 'react-native';
import {Button, Icon, Input, Spinner} from 'react-native-ui-kitten';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {H2, H3, Header, CardItem, Card} from 'native-base';
import rupiah from 'rupiah-format';

class DetailJobScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      job: '',
      description: '',
      logo: '',
      company: '',
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.setState({
      // id: navigation.getParam('id'),
      job: navigation.getParam('job'),
      description: navigation.getParam('description'),
      salary: navigation.getParam('salary'),
      logo: navigation.getParam('logo'),
      company: navigation.getParam('company'),
      location: navigation.getParam('location'),
    });
  }

  render() {
    const imageUri = `http://10.0.2.2:5200/public/logo/${this.state.logo}`;
    const {navigation} = this.props;
    // console.log(this.props.navigation.getParam('description'));
    return (
      <>
        {/* <View>
          <Text>{this.state.id}</Text>
          <Text>{this.state.job}</Text>
          <Text>{this.state.description}</Text>
          <Text>{this.state.salary}</Text>
          <Text>{navigation.getParam('category')}</Text>
        </View> */}
        <ParallaxScrollView
          backgroundColor="##00B6D7"
          parallaxHeaderHeight={400}
          backgroundScrollSpeed={2}
          stickyHeaderHeight={80}
          renderFixedHeader={() => (
            <Header
              title={this.state.job}
              rightComponent={
                <Button transparent onPress={() => navigation.goBack()}>
                  <Text>Back</Text>
                </Button>
              }
            />
          )}
          renderBackground={() => (
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={{
                uri: imageUri,
              }}
            />
          )}
          renderForeground={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <H2 style={styles.title}>{this.state.job}</H2>
            </View>
          )}>
          <View style={styles.content}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Image
                  source={{uri: imageUri}}
                  style={{
                    // alignSelf: 'left',
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                    marginVertical: 20,
                  }}
                />
              </View>
              <View>
                <H3 style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
                  {this.state.job}
                </H3>
                <Text style={styles.textCompany}>{this.state.company}</Text>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 13}}>
                  {this.state.location}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: '#0DC200',
                    fontSize: 15,
                  }}>
                  {rupiah.convert(this.state.salary)}
                </Text>
              </View>
            </View>

            <View style={styles.line} />
            <View style={{paddingBottom: 20}}>
              <Text style={styles.textDescription}>
                {this.state.description}
              </Text>
            </View>
          </View>
        </ParallaxScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 5,
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

export default DetailJobScreen;
