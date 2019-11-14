import React, {Component} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
// import Drawer from 'react-native-drawer';
import {
  Drawer,
  Icon,
  DrawerHeaderFooter,
  Button,
  Layout,
} from 'react-native-ui-kitten';
import AsyncStorage from '@react-native-community/async-storage';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      isLoading: '',
    };
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
  LogoutIcon = style => <Icon {...style} name="log-out" />;

  drawerData = [
    {
      title: 'Home',
      screen: 'HomeScreen',
      icon: this.SettingIcon,
    },
    {
      title: 'Perusahaan',
      screen: 'Company',
      icon: this.CompanyIcon,
    },
    {
      title: 'Profil',

      icon: this.PersonIcon,
    },
  ];

  onRouteSelect = index => {
    const {[index]: route} = this.drawerData;
    // navigate with React Navigation
    this.props.navigation.navigate(route.screen);
  };

  // _renderProfileHeader = () => (
  //   <DrawerHeaderFooter title="Hello username" icon={this.PersonIcon} />
  // );

  _renderFooter = () => (
    <DrawerHeaderFooter
      title="Keluar"
      onPress={() => this.logout()}
      icon={this.LogoutIcon}
    />
  );

  logout() {
    AsyncStorage.removeItem('token');
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <>
        <Layout style={styles.container}>
          <Drawer
            data={this.drawerData}
            header={this._renderProfileHeader}
            footer={this._renderFooter}
            onSelect={this.onRouteSelect}
          />
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default DrawerContent;
