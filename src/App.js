import { Provider } from 'react-redux';
import React, { Component } from 'react';

import store from './store';

import Router from './App.router';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
