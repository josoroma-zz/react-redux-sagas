import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserDetails from './UserDetails';

import { getUserProfileWatcher, logoutWatcher } from '../../store/actionCreators/session';

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
    const { session } = this.props;

    return (
      <div className="wrapper">
        <div className="login-box">
          <h1>AppRoot</h1>
          {session.user ? <UserDetails user={this.props.session.user} /> : <div />}
          <button className="error" onClick={this.logout}>
            Logout
          </button>
        </div>
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
  logoutWatcher: PropTypes.func
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

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
