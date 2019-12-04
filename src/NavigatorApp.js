import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Jobs from './components/Jobs/Jobs';
import EditJobScreen from './screens/Jobs/EditJobScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
import DetailJobScreen from './screens/Jobs/DetailJobScreen';
import AddJobScreen from './screens/Jobs/AddJobScreen';
import Company from './screens/Companies/Company';
import DetailCompanyScreen from './screens/Companies/DetailCompanyScreen';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Jobs: {
    screen: Jobs,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  DetailJobScreen: {
    screen: DetailJobScreen,
    navigationOptions: {
      header: null,
    },
  },
  AddJobScreen: {
    screen: AddJobScreen,
  },
  EditJobScreen: {
    screen: EditJobScreen,
  },
  Company: {
    screen: Company,
    navigationOptions: {
      header: null,
    },
  },
  DetailCompanyScreen: {
    screen: DetailCompanyScreen,
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const NavigatorApp = createAppContainer(MainNavigator);

export default NavigatorApp;
