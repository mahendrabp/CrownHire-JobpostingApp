import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
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
import {Item, Input} from 'native-base';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isLoading: false,
    // };
  }

  componentDidMount() {
    this.checkAuth();
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
          </View>

          <View>
            <Text>test</Text>
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
});

export default HomeScreen;
