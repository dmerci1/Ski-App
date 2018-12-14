import React, { Component } from 'react';
import { Text } from 'react-native';
import { List, ListItem } from 'native-base';

class DogListItem extends Component {
  constructor(props) {
    super(props);

    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { dog, navigation } = this.props;
    navigation.navigate('editdog', { dog });
  }

  render() {
    const { dog } = this.props;

    return (
      <List>
        <ListItem onPress={this.onRowPress}>
          <Text>Hello</Text>
        </ListItem>
      </List>
    );
  }
}

export default DogListItem;
