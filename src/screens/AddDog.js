import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native';
import { Container, Content, Body, Header, Form, Item, ListItem, CheckBox, Label, Input, Button, Left, Picker } from 'native-base';

import { dogUpdate, dogCreate, userDogCreate } from '../actions';

class AddDog extends Component {

  onButtonPress() {
    const { name, breed, gender, age, bio, phone } = this.props;

    const navigationProps = this.props.navigation;
  
    this.props.dogCreate({ name, breed, gender, age, bio, phone, navigationProps });
}
  render() {
    return (
      <Container>
      <Header style={{ height: 80 }}>
        <Left>
          <Button
          block
          onPress={() => this.props.navigation.navigate('doglist')}
          >
            <Text>Back to Dog List</Text>
          </Button>
        </Left>
      </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
                <Input
                value={this.props.name}
                onChangeText={value => this.props.dogUpdate({ prop: 'name', value })}
                />
              </Item>
              <Text>Breed</Text>
               <Picker
                mode="dropdown"
                selectedValue={this.props.breed}
                onValueChange={value => this.props.dogUpdate({ prop: 'breed', value })}
                >
                  <Item label="Labrador" value="Labrador" />
                  <Item label="Poodle" value="Poodle" />
                  <Item label="Doxin" value="Doxin" />
                  <Item label="Beagle" value="Beagle" />
                </Picker>
                  <Text>Gender</Text>
                   <Picker
                    mode="dropdown"
                    selectedValue={this.props.gender}
                    onValueChange={value => this.props.dogUpdate({ prop: 'gender', value })}
                    >
                      <Item label="Male" value="Male" />
                      <Item label="Female" value="Female" />
                    </Picker>
                 <Item stackedLabel>
                    <Label>Age</Label>
                      <Input
                      value={this.props.age}
                      onChangeText={value => this.props.dogUpdate({ prop: 'age', value })}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label>Bio</Label>
                        <Input
                        value={this.props.bio}
                        onChangeText={value => this.props.dogUpdate({ prop: 'bio', value })}
                        />
                      </Item>
                      <Item stackedLabel>
                        <Label>Phone Number</Label>
                          <Input
                          value={this.props.phone}
                          onChangeText={value => this.props.dogUpdate({ prop: 'phone', value })}
                          />
                        </Item>
                    </Form>
                    <Button
                     block info
                     onPress={this.onButtonPress.bind(this)}
                     >
                       <Text>Add Dog</Text>
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

export default connect(mapStateToProps, { dogUpdate, dogCreate, userDogCreate })(AddDog);
