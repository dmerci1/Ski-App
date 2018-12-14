import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native';
import { Container, Content, Body, Header, Form, Item, ListItem, CheckBox, Label, Input, Button, Left, Picker } from 'native-base';
import { locationUpdate, locationCreate, userDogCreate } from '../actions';

class LocationsScreen extends Component {

  onButtonPress() {
    const { name  } = this.props;

    const navigationProps = this.props.navigation;
    this.props.locationCreate({ name });
}
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
                <Input
                value={this.props.name}
                onChangeText={value => this.props.locationUpdate({ prop: 'name', value })}
                />
              </Item>
                    </Form>
                    <Button
                     block info
                     onPress={this.onButtonPress.bind(this)}
                     >
                       <Text>Add Location</Text>
                     </Button>
                  </Content>
                </Container>

    );
  }
}

const mapStateToProps = (state) => {
  const { name, breed, gender, age, bio, phone } = state.dogForm;

  return { name, breed, gender, age, bio, phone };
};

export default connect(mapStateToProps, { locationUpdate, locationCreate, userDogCreate })(LocationsScreen);
