import { Provider } from 'react-redux';
import React, { Component } from 'react';

import store from './store';

import Router from './App.router';

/**
 * material-ui@next - Styles
 *
 * Use `theme.palette.background.default` for standard devices and a white background for print devices.
 *
 * - https://material-ui-next.com/style/css-baseline
 */
import CssBaseline from 'material-ui/CssBaseline';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
          <Router />
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
