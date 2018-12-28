import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions, Accelerometer } from 'expo';
import axios from 'axios';
import { Container, Header, Content, Left, Right, Body, Button } from 'native-base';
import Weather from '../components/weather';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

  this.state = {
    latitude: null,
    longitude: null,
    altitude: null,
    speed: null,
    errorMessage: null,
    accelerometerData: {},
    temperature: 0,
    weatherCondition: null
  };
}

  componentWillMount() {
    const apiKey = 'a515beac07f21a6bc8ecbb71c8c4c525';

     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=${apiKey}`)
     .then(res => {
       console.log(res);
     });


      Accelerometer.addListener(accelerometerData => {
        this.setState({ accelerometerData });
      });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            speed: position.coords.speed,
            errorMessage: null,
          });
        },
        (error) => this.setState({ error: error.message}),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );

  }
  componentDidMount() {

      Accelerometer.setUpdateInterval(100);
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;


    return (
      <Container>
        <Header style={{ backgroundColor: '#1da1f2', height: 60 }}>
          <Left />
            <Body>
              <Text style={{ color: 'white', fontSize: 20}}>SkiRection</Text>
            </Body>
          <Right />
        </Header>

      <Content style={styles.sensor}>
        <Text>Accelerometer:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>

        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Altitude: {this.state.altitude}</Text>
        <Text>Speed: {this.state.speed}</Text>
<Weather />
    </Content>
  </Container>

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

export default HomeScreen;
