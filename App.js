import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import Navigator from './src/components/Navigator';
import reducers from './src//reducers';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    const config = {
    apiKey: "AIzaSyCeOZRgbtjPmvkOslGbGXDTJMUpWTlfJEE",
    authDomain: "its-lit-47d1a.firebaseapp.com",
    databaseURL: "https://its-lit-47d1a.firebaseio.com",
    projectId: "its-lit-47d1a",
    storageBucket: "its-lit-47d1a.appspot.com",
    messagingSenderId: "300038339200"
  };
  firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, compose(
      applyMiddleware(thunk)
    )
    );

    return (
      <Provider store={store}>
        <Navigator />
     </Provider>
    );
  }
}

export default App;
