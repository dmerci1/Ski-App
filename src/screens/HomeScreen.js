import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions, Accelerometer } from 'expo';
import axios from 'axios';
import { Button } from 'native-base';

class HomeScreen extends Component {
  /*state = {
    accelerometerData: {},
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;

    return (
      <View style={styles.sensor}>
        <Text>Accelerometer:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
*/  state = {
  region: null,
errorMessage: null,
};
componentWillMount() {
  this.getLocationAsync();





}

onButtonPress = () => {
  const { latitude, longitude } = this.state.region;
    const userLat = { latitude };
    const userLon = { longitude };
    const latString = JSON.stringify(userLat);
    const lonString = JSON.stringify(userLon);
      const apiKey = 'a515beac07f21a6bc8ecbb71c8c4c525';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=Loappid=Lonndon,uk&${apiKey}`)
    .then(res => {
      console.log(res);
    });
   console.log(latString);

 }
getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

   let location = await Location.getCurrentPositionAsync({});
   const region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
   this.setState({region});

   const { latitude, longitude } = this.state.region;
     const userLat = { latitude };
     const userLon = { longitude };
   console.log(userLocation);

};



  render() {
    return (
      <View style={styles.container}>
          <Button
            block
            danger
            onPress={this.onButtonPress}/>
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

export default HomeScreen;
