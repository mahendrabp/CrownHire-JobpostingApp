import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from 'react-native-ui-kitten';
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isLoading: false,
    // };
  }

  closeControlPanel = () => {
    this._drawer.close();
  };

  openControlPanel = () => {
    this._drawer.open();
  };

  MenuIcon(style) {
    return <Icon {...style} name="menu-2-outline" fill="#B894FF" />;
  }

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
        <StatusBar barStyle="light-content" backgroundColor="#B894FF" />
        <Drawer
          ref={ref => (this._drawer = ref)}
          openDrawerOffset={200}
          tapToClose={true}
          content={<DrawerContent navigation={this.props.navigation} />}>
          <View style={styles.container}>
            <TopNavigation
              title="CROWNHIRE"
              alignment="center"
              style={styles.topNav}
              titleStyle={styles.titleTopNav}
              leftControl={this.MenuDrawerAction()}
            />
          </View>

          <View>
            <Text>test</Text>
          </View>
        </Drawer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNav: {
    borderRadius: 10,
    // marginTop: 12,
    shadowColor: '#000',
    marginHorizontal: 12,
    elevation: 14, //This adds a drop shadow to the item and affects z-order for overlapping views. , inntinya adalah menambah kayak border supaya timbul shadow (border timbul)
    // zIndex: 2,
  },
  titleTopNav: {
    fontFamily: 'Montserrat-Bold',
  },
});

export default HomeScreen;
