import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List, ListItem } from 'native-base';

class LocationListItems extends Component {
  constructor(props) {
    super(props);

    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { location, navigation } = this.props;
    const { name } = location;
    //navigation.navigate('editdog', { dog });
  }

  render() {
    const { location, navigation } = this.props;

    const name  = 'Hello';
    //const { name } = this.props;

    return (
      <List>
        <ListItem>

          <Text>Hello</Text>
          </ListItem>
      </List>
    );
  }
}

export default LocationListItems;
