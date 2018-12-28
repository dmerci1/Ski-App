import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import UserLocationScreen from '../screens/UserLocationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecordingScreen from '../screens/RecordingScreen';

import DogList from '../screens/DogList';
import AddDog from '../screens/AddDog';
import MapScreen from '../screens/MapScreen';

const AuthNav = createBottomTabNavigator({
  login: { screen: LoginScreen },
  register: { screen: RegisterScreen }
});

const HomeNav = createBottomTabNavigator({
 recordings: RecordingScreen,
 home: HomeScreen,
 tabBarIcon: ({ tintColor }) => (
   <Icon name='users' size={30} color="#900" />
 ),
 settings: SettingsScreen,
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#1da1f2',
    },
    labelStyle: {
      fontSize: 10,
      color: 'white',
    }
  },
}
);
 //view: { screen: ViewBarScreen }



 const Navigation = createBottomTabNavigator({
  loading: { screen: LoadingScreen,
    navigationOptions: {
      tabBarVisible: false
      }
    },
  auth: { screen: AuthNav,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  main: { screen: HomeNav,
    navigationOptions: {
      tabBarVisible: false
      }
    },
});

 const Navigator = createAppContainer(Navigation);

export default Navigator;
