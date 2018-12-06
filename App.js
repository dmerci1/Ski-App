import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions} from 'expo';
import axios from 'axios';

export default class App extends React.Component {
  state = {
  location: null,
errorMessage: null,
};
componentWillMount() {
  this.getLocationAsync();


  const apiKey = 'a515beac07f21a6bc8ecbb71c8c4c525';
axios.get(`https://api.openweathermap.org/data/2.5/weather?q={location}&appid=${apiKey}`)
.then(res => {
  console.log(res);
});
}

getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({location});

   console.log(location);

};

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
