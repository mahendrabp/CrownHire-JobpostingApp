/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import NavigatorApp from './src/NavigatorApp';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
} from 'react-native-ui-kitten';

class App extends Component {
  render() {
    return (
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Provider store={store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <NavigatorApp />
          </ApplicationProvider>
        </Provider>
      </>
    );
  }
}

export default App;
