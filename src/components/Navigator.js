import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import UserLocationScreen from '../screens/UserLocationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DogList from '../screens/DogList';
import AddDog from '../screens/AddDog';
import MapScreen from '../screens/MapScreen';

const AuthNav = createBottomTabNavigator({
  loading: { screen: LoadingScreen,
  navigationOptions: {
    tabBarVisible: false
    }
  },  login: { screen: LoginScreen },
  register: { screen: RegisterScreen },
  loading: { screen: LoadingScreen,
  navigationOptions: {
    tabBarVisible: false
    }
  },
});

const HomeNav = createBottomTabNavigator({
auth: AuthNav,
 home: HomeScreen,
 locations: DogList,
 map: AddDog
});


 const Navigator = createAppContainer(HomeNav);

export default Navigator;
