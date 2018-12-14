import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import Navigator from './src/components/Navigator';
import reducers from './src/reducers';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyBnChyQHTLQ0XTMkw9T_dKvOO8uv32MOYg",
   authDomain: "skiapp-ce9d8.firebaseapp.com",
   databaseURL: "https://skiapp-ce9d8.firebaseio.com",
   projectId: "skiapp-ce9d8",
   storageBucket: "skiapp-ce9d8.appspot.com",
   messagingSenderId: "509846412712"
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
