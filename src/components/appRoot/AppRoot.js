import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserDetails from './UserDetails';

import { getUserProfileWatcher, logoutWatcher } from '../../store/actionCreators/session';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  logout: {
    marginTop: '30px'
  }
});

class AppRoot extends Component {
  componentDidMount() {
    // Thanks to `mapDispatchToProps`.
    this.props.getUserProfileWatcher();
  }

  logout = () => {
    // Thanks to `mapStateToProps`.
    this.props.logoutWatcher();
  };

  render() {
    const { classes, session } = this.props;

    return (
      <div className={classes.root}>
        <h1>AppRoot</h1>
        {session.user ? <UserDetails user={this.props.session.user} /> : <div />}
        <Button onClick={this.logout} className={classes.logout} variant="raised" color="primary" size="small">
          Logout
        </Button>
      </div>
    );
  }
}

/**
 * Typechecking With PropTypes.
 *
 * - https://reactjs.org/docs/typechecking-with-proptypes.html
 */
AppRoot.propTypes = {
  session: PropTypes.object,
  getUserProfileWatcher: PropTypes.func,
  logoutWatcher: PropTypes.func,
  classes: PropTypes.object.isRequired
};

/**
 * The results of mapStateToProps must be a plain object, which will be merged into the component’s props.
 * If we don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.
 */
const mapStateToProps = ({ session }) => ({
  session
});

/**
 * Turns an object whose values are action creators, into an object with the same keys,
 * but with every action creator wrapped into a dispatch call so they may be invoked directly.
 *
 * - https://github.com/reactjs/redux/blob/master/docs/api/bindActionCreators.md
 */
const mapDispatchToProps = dispatch => bindActionCreators({ getUserProfileWatcher, logoutWatcher }, dispatch);

/**
 * connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 *
 * Connects a React component to a Redux store. connect is a facade around
 * connectAdvanced,providing a convenient API for the most common use cases.
 *
 * It does not modify the component class passed to it; instead, it returns
 * a new,connected component class for you to use.
 */

export default compose(withStyles(styles, { name: 'AppRoot' }), connect(mapStateToProps, mapDispatchToProps))(AppRoot);
