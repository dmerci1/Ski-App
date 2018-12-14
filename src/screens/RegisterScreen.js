import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Spinner, Button, Card } from 'native-base';
import { emailChanged, passwordChanged, createUser } from '../actions';

class RegisterScreen extends Component {
  onEmailChange(text) {
  this.props.emailChanged(text);
}
onPasswordChange(text) {
  this.props.passwordChanged(text);
}
onButtonPress() {
  const { email, password } = this.props;
  this.props.createUser({ email, password });
}

renderButton() {
  if (this.props.loading) {
    return <Spinner color='blue' />;
  }

    return (
      <Button
      block
      danger
      onPress={this.onButtonPress.bind(this)}
      >
        <Text>Register</Text>
      </Button>
    );
}
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <Item fixedLabel>
              <Label>E-Mail</Label>
              <Input
              value={this.props.email}
              onChangeText={this.onEmailChange.bind(this)}
              />
            </Item>
            <Item fixedLabel>
              <Label>Password</Label>
              <Input
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
              />
            </Item>
            <Text style={{ fontSize: 20, alignSelf: 'center', color: 'red' }}>
              { this.props.error }
            </Text>
              {this.renderButton()}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, createUser })(RegisterScreen);
