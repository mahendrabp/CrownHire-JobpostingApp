import React, {Component} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
// import Drawer from 'react-native-drawer';
import {Drawer, Icon, DrawerHeaderFooter, Button} from 'react-native-ui-kitten';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  drawerMenu = [
    {
      title: 'Home',
      screen: 'Home',
    },
    {
      title: 'Login',
      screen: 'Login',
    },
    {
      title: 'Register',
      screen: 'Register',
    },
  ];
  render() {
    return (
      <>
        <View style={styles.container}>
          <Drawer data={this.drawerMenu}></Drawer>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
});

export default DrawerContent;
