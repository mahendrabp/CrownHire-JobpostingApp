import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';

const MainNavigator = createStackNavigator({
  LoginScreen,
});

const NavigatorApp = createAppContainer(MainNavigator);

export default NavigatorApp;
