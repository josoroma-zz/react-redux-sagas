import { Provider } from 'react-redux';
import React, { Component } from 'react';

import store from './store';

import Router from './App.router';

import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import MenuAppBar from './components/layout/MenuAppBar';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MenuAppBar />
        <Provider store={store}>
          <Router />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
