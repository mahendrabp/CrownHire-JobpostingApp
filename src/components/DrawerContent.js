import React, {Component} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
// import Drawer from 'react-native-drawer';
import {Drawer, Icon, DrawerHeaderFooter, Button} from 'react-native-ui-kitten';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  drawerData = [
    {
      title: 'Home',
      screen: 'Home',
      icon: this.SettingIcon,
    },
    {
      title: 'get All Jobs',
      screen: 'Jobs',
      icon: this.HistoryIcon,
    },
  ];

  onRouteSelect = index => {
    const {[index]: route} = this.drawerData;
    // navigate with React Navigation
    this.props.navigation.navigate(route.screen);
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <Drawer
            data={this.drawerData}
            // header={this.__renderProfileHeader}
            // footer={this.__renderFooter}
            onSelect={this.onRouteSelect}
          />
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
