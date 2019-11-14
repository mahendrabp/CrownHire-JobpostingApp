import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-ui-kitten';

import notFoundImage from '../../assets/404notfound.png';

class Company extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <View
            style={{
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{width: 300, height: 300, marginBottom: 20}}
              source={notFoundImage}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Button>Kembali</Button>
            </TouchableOpacity>
          </View>
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
