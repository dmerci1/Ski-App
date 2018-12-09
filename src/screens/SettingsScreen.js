import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const mapState = (state) => ({
  data: state.settings.data
});

class SettingsScreen extends Component {
  render() {
  return (
    <View>
      <Text>Settings Screen</Text>
      <Text>The answer is: {this.props.data}</Text>
    </View>
  );
}
}

export default connect(mapState)(SettingsScreen);
