import React from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = () => {
  return (
    <View>
      <MaterialCommunityIcons size={48} name="weather-sunny" color='blue' />
      <Text>Temperature</Text>
    </View>
  )
}

export default Weather;
