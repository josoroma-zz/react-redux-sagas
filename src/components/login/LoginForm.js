import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';

import { loginWatcher } from '../../store/actionCreators/session';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  formActions: {
    marginTop: '30px',
    marginBottom: '10px'
  },
  error: {
    color: '#ccc',
    fontSize: '11px'
  }
});

class LoginForm extends Component {
  state = {
    // Fields.
    email: '',
    password: '',
    // Errors.
    errors: {
      email: '',
      password: ''
    },
    // Loader.
    isSubmitting: false
  };

  /**
   * Simple validation logic is used here.
   *
   * Can be used with formik to validate forms.
   *
   * @returns {Promise}
   */
  validate = () => {
    let { email, password } = this.state;

    return new Promise((resolve, reject) => {
      let errors = {};

      if (!email) errors.email = 'Please enter your email address';
      if (!password) errors.password = 'Please enter your password';

      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && !emailRegex.test(email)) errors.email = 'Please enter a valid email address';
      if (password && password.length < 8) errors.password = 'Password must be greater than or equalt to 8 characters';

      if (Object.keys(errors).length > 0) {
        reject(errors);
      } else {
        resolve();
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();

    this.validate()
      .then(() => {
        this.setState({
          errors: {},
          isSubmitting: true
        });
        new Promise((resolve, reject) => {
          this.props.loginWatcher({ ...this.state }, resolve, reject);
        }).catch(e => {
          this.setState({
            isSubmitting: false
          });
        });
      })
      .catch(errors => {
        this.setState({ errors });
      });
  };

  handleEmailChange = event => {
    event.preventDefault();

    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    event.preventDefault();
    this.setState({
      password: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    let { email, password, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <FormControl className={classes.formControl} aria-describedby="name-helper-text">
              <InputLabel htmlFor="name-helper">Email</InputLabel>
              <Input type="email" id="email-helper" value={email} onChange={this.handleEmailChange} />
              <span className={classes.error}>{errors.email}</span>
            </FormControl>
            <FormControl className={classes.formControl} aria-describedby="name-helper-text">
              <InputLabel htmlFor="password-helper">Password</InputLabel>
              <Input type="password" id="password-helper" value={password} onChange={this.handlePasswordChange} />
              <span className={classes.error}>{errors.password}</span>
            </FormControl>
            <CardActions className={classes.formActions}>
              <Button type="submit" variant="raised" color="primary" className="success" size="small">
                {this.state.isSubmitting ? <div className="loader" /> : `Login`}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginWatcher: PropTypes.func,
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ loginWatcher }, dispatch);

export default compose(withStyles(styles, { name: 'LoginForm' }), connect(null, mapDispatchToProps))(LoginForm);
