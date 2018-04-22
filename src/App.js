import { Provider } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container className={classes.root} alignItems="center" justify="center" direction="row" spacing={0}>
          <Paper className={classes.paper}>
            <Provider store={store}>
              <Router />
            </Provider>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
