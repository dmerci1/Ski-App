import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Accelerometer } from 'expo';
import firebase from 'firebase';
import moment from 'moment';

function Timer({ interval, style }) {
  const pad = (n) => n < 10 ? '0' + n : n;
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
<View style={styles.timerContainer}>
 <Text style={styles.timer}>
    {pad(duration.minutes())}:{pad(duration.seconds())}:{pad(centiseconds)}</Text>
</View>
  )
}

function RoundButton({ title, color, background, onPress, disabled }) {
    return (
      <TouchableOpacity
        onPress={() => !disabled && onPress()}
        style={[ style=styles.button, { backgroundColor: background }]}
        activeOpacity={0.7}
      >
        <View style={styles.buttonBorder}>
          <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
}
function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ]
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap { number }</Text>
      <Text styles={[lapStyle, styles.lapTimer]}> interval={ interval }</Text>
    </View>
  )
}

function LapsTable({ laps, timer}) {
  const finishedLaps = laps.slice(1)
  let min = Number.Max_Safe_integer
  let max = Number.Min_Safe_integer
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap
      if (lap > max) max = lap
    })
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  )
}
function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}
class RecordingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      now: 0,
      laps: [],
      counter: [],
      accelerometerData: {},
      latitude: null,
      longitude: null,
      altitude: null,
      speed: null,
    }
  }

  componentWillMount() {

      Accelerometer.addListener(accelerometerData => {
        this.setState({ accelerometerData });
      });

}
componentDidMount() {

    Accelerometer.setUpdateInterval(100);

}
  componentWillUnmount() {
    clearInterval(this.timer);
    navigator.geolocation.clearWatch(this.watchId);
  }

  start = () => {
    const now = new Date().getTime();
    const counter = []
    this.setState({
      start: now,
      now,
      laps: [0],
    })
    this.timer = setInterval(() => {
      this.setState({ now : new Date().getTime()})
    }, 100)
    counter.push({now})
    //console.log(counter)
  }

   lap = () => {
    const timestamp = new Date().getTime()
    const { laps, now, start, accelerometerData, latitude, longitude, altitude, speed } = this.state
    const [firstLap, ...other] = laps
    const { currentUser } = firebase.auth()
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          laps: [0, firstLap + now - start, ...other],
          start: timestamp,
          now: timestamp,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          speed: position.coords.speed,
          errorMessage: null,
        });
      },
      (error) => this.setState({ error: error.message}),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1 },
    );
    
    firebase.database().ref(`/users/${currentUser.uid}/recordings`)
    .push({ laps, accelerometerData, latitude, longitude, altitude, speed })
    console.log(accelerometerData);
  }

  stop = () => {
    clearInterval(this.timer)
    const { now, start, laps, counter } = this.state;
    const [firstLap, ...other] = laps
    this.setState({
      laps: [ firstLap + now - start, ...other],
      start: 0,
      now: 0
    })
    console.log(counter);
  }
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0
    })
  }

  resume = () => {
    const now = new Date().getTime()
    const yup = 'yay'
    const counter = []
    this.setState({
      start: now,
      now,
    })
    this.timer = setInterval(() => {
      this.setState({ now : new Date().getTime()})
    }, 100)
    counter.push[{yup}]
    console.log[{counter}]
  }

  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
      <Timer
        interval={laps.reduce((total, curr) => total + curr, 0) + timer}
        style={styles.timer}
      />
        {laps.length === 0 && (
        <ButtonsRow>

         <RoundButton
           title='Record'
           color='#50D167'
           background='#3D3D3D'
           onPress={this.start}
          />
        </ButtonsRow>
      )}
        {start > 0 && (
          <View>
        <ButtonsRow>
        <RoundButton
          title='Lap'
          color='#50D167'
          background='#3D3D3D'
          onPress={this.lap}
         />
        <RoundButton
          title='Pause'
          color='#50D167'
          background='#3D3D3D'
          onPress={this.stop}
         />
        </ButtonsRow>
         <Text>Recording in progress</Text>
        </View>



      )}

      {laps.length > 0 && start === 0 && (
        <View>
        <ButtonsRow>
        <RoundButton title='Resume' color='white' background='#1B3617' onPress={this.resume} />
      <RoundButton title='Reset' color='white' background='#1B3617' onPress={this.reset}/>
      </ButtonsRow>
      <Text>Recourding Paused</Text>
      </View>
    )}
    <LapsTable laps={laps} timer={timer}/>
      </View>
    );
  }
}

export default RecordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  timer: {
    color: 'blue',
    fontSize: 70,
    fontWeight: '200',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
  },
  lapText: {
    color: 'blue',
    fontSize: 18,
  },
  lapTimer: {
    width: 30
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastest: {
    color: 'red',
  },
  slowest: {
    color: 'blue',
  },
  timerContainer: {
    flexDirection: 'row',
  }
});
