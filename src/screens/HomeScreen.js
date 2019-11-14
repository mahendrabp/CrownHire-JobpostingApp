import React, {Component} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Button,
} from 'react-native-ui-kitten';
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';
import AsyncStorage from '@react-native-community/async-storage';
import {Item, Input, Card, CardItem, Body, Left, Right} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import {createBottomTabNavigator, TabBarBottom} from 'react-navigation-tabs';
import axios from 'axios';
import {Col} from 'react-native-easy-grid';
import {Facebook as Loader} from 'react-content-loader/native';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      status: '',
      onLoading: true,
      news: [],
    };
  }

  componentDidMount() {
    this.getJob();
    this.checkAuth();
    this.getNews();
  }

  async getJob() {
    this.setState({
      isLoading: true,
    });

    await axios
      .get(
        `http://localhost:5200/api/v1/jobs?name=&location&limit=5&page=1&sortby=updated_at&orderby=desc`,
      )
      .then(res => {
        this.setState({
          data: res.data.data.result,
          isLoading: false,
          status: '',
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  closeControlPanel = () => {
    this._drawer.close();
  };

  async checkAuth() {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      this.props.navigation.replace('Login');
    }
    // console.log(token);
  }

  openControlPanel = () => {
    this._drawer.open();
  };

  MenuIcon(style) {
    return <Icon {...style} name="menu-2-outline" fill="#fff" />;
  }
  // SearchMenu(style) {
  //   return <Icon {...style} name="menu-2-outline" fill="#409BF6" />;
  // }

  MenuDrawerAction() {
    return (
      <TopNavigationAction
        icon={this.MenuIcon}
        onPress={() => this.openControlPanel()}
      />
    );
  }

  async getNews() {
    this.setState({
      isLoading: true,
    });

    await axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=id&apiKey=5d292d5fca5f446f89a2a279aec88376`,
      )
      .then(res => {
        this.setState({
          news: res.data.articles,
          isLoading: false,
          status: '',
        });
        console.log(res.data.articles);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  _renderListJob = () => {
    this.state.data.map(v => {
      console.log(v);
      return (
        // <Card>
        //   <CardItem>
        //     <Body>
        //       <Text>//Your text here</Text>
        //     </Body>
        //   </CardItem>
        // </Card>
        <Text>{v.job}</Text>
      );
    });
  };

  _renderNews = async () => {
    await this.state.news.map(v => {
      // this.state.isLoading === true ? (
      //   <Loader
      //     width={250}
      //     style={{
      //       padding: 8,
      //       alignContent: 'center',
      //       justifyContent: 'center',
      //     }}
      //   />
      // ) : (
      //   <Text>{v.author}</Text>
      // );
      console.log(v);
    });
  };

  _linkPressed = url => {
    Linking.openURL(url);
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#409BF6" />
        <Drawer
          ref={ref => (this._drawer = ref)}
          openDrawerOffset={200}
          tapToClose={true}
          content={<DrawerContent navigation={this.props.navigation} />}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: '#409BF6',
                borderBottomEndRadius: 50,
                elevation: 10,
                height: 200,
              }}>
              <TopNavigation
                alignment="center"
                style={styles.topNav}
                titleStyle={styles.titleTopNav}
                title="CROWNHIRE"
                leftControl={this.MenuDrawerAction()}
              />
              <View
                style={{
                  marginTop: 10,
                  paddingHorizontal: 25,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  Temukan yang kamu ingin kan ....
                </Text>
                <Item
                  regular
                  style={{
                    width: '100%',
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    marginTop: 20,
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    elevation: 5,
                  }}>
                  <Input
                    placeholder="Temukan kerja impian mu ...."
                    placeholderTextColor="#95a5a6"
                    style={styles.searchBar}
                    icon={SearchMenu}
                    onFocus={() => {
                      this.props.navigation.navigate('Jobs');
                    }}
                  />
                </Item>
              </View>
            </View>
            <ScrollView>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  elevation: 10,
                  height: 150,
                }}>
                <View style={{marginTop: 20, marginLeft: 15}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    Pekerjaan Terbaru
                  </Text>
                </View>
                <View style={{marginHorizontal: -5}}>
                  <ScrollView
                    horizontal={true}
                    style={{backgroundColor: '#fff'}}>
                    {this.state.data.map(v => (
                      <TouchableOpacity
                        key={v.id}
                        onPress={() =>
                          this.props.navigation.navigate('DetailJobScreen', v)
                        }>
                        <Card
                          key={v.id}
                          style={{
                            borderRadius: 5,
                            elevation: 10,
                            backgroundColor: '#fff',
                            padding: 5,
                            width: 250,
                            height: 100,
                            marginHorizontal: 10,
                          }}>
                          <CardItem style={{flexDirection: 'row'}}>
                            <View>
                              <Image
                                source={{
                                  uri: `http://localhost:5200/public/logo/${v.logo}`,
                                }}
                                style={{
                                  height: 40,
                                  width: 40,
                                }}
                              />
                            </View>
                            <View style={{marginLeft: 20}}>
                              <Text>{v.job}</Text>
                              <Text>{v.company}</Text>
                              <Text>{v.location}</Text>
                            </View>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={{height: 2700, marginHorizontal: 10}}>
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                  {this.state.news.map((v, index) => (
                    <Card
                      key={index}
                      style={{
                        borderRadius: 5,
                        elevation: 10,
                        backgroundColor: '#fff',
                        // padding: 5,
                        // width: 250,
                        marginHorizontal: 15,
                        flex: 1,
                      }}>
                      <TouchableOpacity
                        onPress={() => this._linkPressed(v.url)}>
                        <CardItem style={{flexDirection: 'row', flex: 1}}>
                          <View>
                            <Image
                              source={{
                                uri: `${v.urlToImage}`,
                              }}
                              style={{
                                height: 70,
                                width: 70,
                              }}
                            />
                          </View>
                          <View style={{marginLeft: 20, width: 210}}>
                            <Text
                              style={{
                                flexWrap: 'wrap',
                                fontFamily: 'Poppinns-Medium',
                                fontWeight: 'bold',
                              }}>
                              {v.title}
                            </Text>
                            <Text>{moment(v.publishedAt).fromNow(true)}</Text>
                            <Text>{v.author}</Text>
                          </View>
                        </CardItem>
                      </TouchableOpacity>
                    </Card>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </Drawer>
      </>
    );
  }
}
const SearchMenu = style => <Icon {...style} name="log-in-outline" />;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNav: {
    backgroundColor: '#409BF6',
    // color: '#fff',
    // borderRadius: 10,
    // marginTop: 12,
    shadowColor: '#000',
    // marginHorizontal: 12,
    // elevation: 14, //This adds a drop shadow to the item and affects z-order for overlapping views. , inntinya adalah menambah kayak border supaya timbul shadow (border timbul)
    // zIndex: 2,
  },
  titleTopNav: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    borderRadius: 15,
    elevation: 10,
    backgroundColor: '#fff',
    padding: 5,
  },
  actionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnAction: {
    padding: 0,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});

export default HomeScreen;
