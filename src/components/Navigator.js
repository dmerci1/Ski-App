import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeNav = createBottomTabNavigator({
 home: HomeScreen,
 locations: LocationsScreen,
 settings: SettingsScreen
});


 const Navigator = createAppContainer(HomeNav);

export default Navigator;
