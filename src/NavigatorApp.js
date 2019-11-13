import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Jobs from './components/Jobs/Jobs';
import EditJobScreen from './screens/Jobs/EditJobScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DetailJobScreen from './screens/Jobs/DetailJobScreen';
import AddJobScreen from './screens/Jobs/AddJobScreen';

const MainNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Jobs: {
    screen: Jobs,
  },
  DetailJobScreen: {
    screen: DetailJobScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  EditJobScreen: {
    screen: EditJobScreen,
  },
  AddJobScreen: {
    screen: AddJobScreen,
  },
});

const NavigatorApp = createAppContainer(MainNavigator);

export default NavigatorApp;
