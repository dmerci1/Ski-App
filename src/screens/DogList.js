import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text } from 'react-native';
import { Container, Content, Header, Button, Left, Body } from 'native-base';
import { fetchDogs } from '../actions';
import DogListItem from './DogListItem';

class DogList extends Component {

  constructor(props) {
  super(props);
//  this.renderRow = this.renderRow.bind(this);
}
  componentWillMount() {
    this.props.fetchDogs();
    console.log('hello');
  }

  componentWillReceiveProps(nextProps) {

  }
  showDog(dog) {
     this.props.navigation.navigate('editdog', { dog });
}

  render() {
    console.log(this.props);
    return (
      <Container>

          <Content>
            <FlatList
              data={this.props.dogs}
              renderItem={
                ({ item }) => (
                  <DogListItem
                    dog={item}
                    navigation={this.props.navigation}
                    onRowPress={(dog) => this.showDog(dog)}
                  />
                )
              }
              keyExtractor={(item, index) => item.uid}
            />

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const dogs = _.map(state.dogs, (val, uid) => {
    return { ...val, uid };
  });

  return { dogs };

};

export default connect(mapStateToProps, { fetchDogs })(DogList);
