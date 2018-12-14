import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, View } from 'react-native';
import firebase from 'firebase';
import { Container, Content, Header, Button, Left, Body } from 'native-base';
import { fetchLocations } from '../actions';
import LocationListItems from '../components/LocationListItems';

class UserLocationsScreen extends Component {
  constructor(props) {
  super(props);
//  this.renderRow = this.renderRow.bind(this);
}
  componentWillMount() {
    this.props.fetchLocations();


  }


  componentWillReceiveProps(nextProps) {

  }
/*  showDog(dog) {
     this.props.navigation.navigate('editdog', { dog });
}
*/
  render() {
    console.log(this.props);
    return (
      <Container>

          <Content>
            <FlatList
              data={this.props.locations}
              renderItem={
                ({ item }) => (
                  <LocationListItems
                    location={item}
                    navigation={this.props.navigation}
                  //  onRowPress={(dog) => this.showDog(dog)}
                  />
                )
              }
              keyExtractor={(item) => item.id}
            />

        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  const locations = _.map(state.locations, (val, uid) => {
    return { ...val, uid };
  });

  return { locations };
};

export default connect(mapStateToProps, { fetchLocations })(UserLocationsScreen);
