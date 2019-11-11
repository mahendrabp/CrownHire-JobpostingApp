import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Jobs from './components/Jobs/Jobs';
import EditJobScreen from './screens/Jobs/EditJobScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const MainNavigator = createStackNavigator({
  Jobs: {
    screen: Jobs,
  },
  Login: {
    screen: LoginScreen,
  },

  Home: {
    screen: HomeScreen,
  },

  Register: {
    screen: RegisterScreen,
  },

  EditJobScreen: {
    screen: EditJobScreen,
  },
});

const NavigatorApp = createAppContainer(MainNavigator);

export default NavigatorApp;
