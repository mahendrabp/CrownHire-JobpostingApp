import React, {Component} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
// import Drawer from 'react-native-drawer';
import {Drawer, Icon, DrawerHeaderFooter, Button} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  SettingIcon(style) {
    return <Icon {...style} name="home-outline" />;
  }
  JobIcon(style) {
    return <Icon {...style} name="briefcase-outline" />;
  }
  CompanyIcon(style) {
    return <Icon {...style} name="compass-outline" />;
  }
  PersonIcon(style) {
    return <Icon {...style} name="person-outline" />;
  }
  LogoutIcon(style) {
    return <Icon {...style} name="alert-triangle-outline" />;
  }

  drawerData = [
    {
      title: 'Home',
      screen: 'HomeScreen',
      icon: this.SettingIcon,
    },
    {
      title: 'get All Jobs',
      screen: 'Jobs',
      icon: this.JobIcon,
    },
    {
      title: 'get all company',
      screen: 'Company',
      icon: this.CompanyIcon,
    },
  ];

  onRouteSelect = index => {
    const {[index]: route} = this.drawerData;
    // navigate with React Navigation
    this.props.navigation.navigate(route.screen);
  };

  // _renderProfileHeader = () => (
  //   <DrawerHeaderFooter title="Hello" icon={this.PersonIcon} />
  // );

  _renderFooter = () => (
    <DrawerHeaderFooter title="Sign out" accessory={this.LogoutButton} />
  );

  LogoutButton = style => (
    <Button
      style={style}
      icon={this.LogoutIcon}
      status="danger"
      onPress={() => this.logout()}
    />
  );

  logout() {
    AsyncStorage.removeItem('token');
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Drawer
            data={this.drawerData}
            header={this._renderProfileHeader}
            footer={this._renderFooter}
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
