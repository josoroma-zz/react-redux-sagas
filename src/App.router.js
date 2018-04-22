import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import * as routes from './constants/routes';

import Login from './components/login';
import AppRoot from './components/appRoot';
import PrivateRoute from './components/common/PrivateRoute';

/**
 * Keep our state in sync with our router.
 *
 * ConnectedRouter will use the store from Provider automatically.
 *
 * - https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
 */
const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.LOGIN} component={Login} />
      <PrivateRoute path={routes.APP_ROOT} component={AppRoot} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
