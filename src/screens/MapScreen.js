import React from "react";
import { StyleSheet, View, Slider, Switch, Text } from "react-native";
import { MapView } from "expo";
import { SegmentedControls } from "react-native-radio-buttons"; // 1.0.0
import rawData from "./rawData";
import runKalmanOnLocations from "./kalman";
import snappedPoints from "./snappedPoints";
import badLocationData from './badLocationData'

const options = [ "Kalman"];
const regionToDisplay = {
  ...rawData[20],
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

export default class HomeScreen extends React.Component {
  state = {
    kalmanConstant: 500
  };

  getLocations = () => {
    let rawDataCopy = rawData.slice();
    const validLocations = rawDataCopy.filter(l => l.validation === "valid");

    const kalmanSolution = runKalmanOnLocations(rawDataCopy, this.state.kalmanConstant);

      return kalmanSolution;
//
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.container} region={regionToDisplay}>
          <MapView.Polyline strokeWidth={4} coordinates={this.getLocations()} />
        </MapView>
        <View style={styles.bottons}>

            <View>

              <Slider
                step={100}
                maximumValue={2000}
                onValueChange={kalmanConstant => {
                  this.setState({
                    kalmanConstant: parseFloat(kalmanConstant)
                  });
                }}
                value={this.state.kalmanConstant}
              />
            </View>

          <SegmentedControls
            options={options}
            allowFontScaling={false}
            onSelection={this.setSelectedOption}
            selectedOption={this.state.selectedOption}

            optionContainerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  bottons: {
    position: "absolute",
    // top: 0,
    left: 0,
    right: 0,
    bottom: 14
  }
});
