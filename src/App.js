import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAf0M8pA-rfVJLm9nmpCM-Xhe85grdi6z4',
      authDomain: 'manager-4594c.firebaseapp.com',
      databaseURL: 'https://manager-4594c.firebaseio.com',
      projectId: 'manager-4594c',
      storageBucket: 'manager-4594c.appspot.com',
      messagingSenderId: '503375093533'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={ store }>
        <Router />
      </Provider>
    );
  }
}

export default App;
