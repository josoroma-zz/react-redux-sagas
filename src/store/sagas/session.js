/**
 * `push` - Pushes a new location to history, becoming the current location.
 */
import { push } from 'react-router-redux';

/**
 * Effects.
 */
import {
  // Creates an Effect description that instructs the middleware to call the function `fn` with `args` as arguments.
  call,
  // Creates an Effect description that instructs the middleware to dispatch an action to the Store.
  put,
  // Spawns a saga on each action dispatched to the Store that matches pattern.
  // Automatically cancels any previous saga task started previous if it's still running.
  takeLatest
} from 'redux-saga/effects';

/**
 * Utils.
 */
import axios from '../../utils/axios';
import * as alert from '../../utils/alert';

/**
 * Actions.
 */
import * as actions from '../../constants/actions';

import { fillUserProfile, authError, clearSession } from '../actionCreators/session';

/* ---------------------------------------------------------------------------------------------------- */

/**
 * Login Operation using Saga.
 */
function loginApi(authParams) {
  return axios.request({
    method: 'post',
    url: `/oauth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: authParams
  });
}

/**
 * Saga function that handles the side effect when the loginActionWatcher is triggered.
 */
export function* loginActionEffect(loginAction) {
  let { payload, resolve, reject } = loginAction;

  try {
    let { data } = yield call(loginApi, payload);

    Object.keys(data).forEach(key => {
      localStorage.setItem(key, data[key]);
    });

    alert.success('Welcome to the App!');

    yield put(push('home'));
    // Resolve.
    if (resolve) resolve();
  } catch (e) {
    alert.error(e.message || 'Authentication Error');
    yield put(authError(e));
    // Reject.
    if (reject) reject(e);
  }
}

/**
 * Saga function that is initiated in the beginning to be able to listen to LOG_IN_WATCHER action.
 */
export function* loginActionWatcher() {
  yield takeLatest(actions.LOG_IN_WATCHER, loginActionEffect);
}

/* ---------------------------------------------------------------------------------------------------- */

/**
 * Fetch Self Operation using Saga.
 */
function fetchSelfApi(authParams) {
  return axios.request({
    method: 'get',
    url: `/users/self`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Saga function that handles the side effect when the fetchSelfActionWatcher is triggered.
 */
export function* fetchSelfActionEffect(fetchSelfAction) {
  try {
    let user = yield call(fetchSelfApi);
    yield put(fillUserProfile(user));
    yield put(push('/'));
  } catch (e) {
    alert.error(e.message || 'Fetch Self API Error');
    yield put(authError(e));
  }
}

/**
 * Saga function that is initiated in the beginning to be able to listen to GET_USER_PROFILE_WATCHER action.
 */
export function* fetchSelfActionWatcher() {
  yield takeLatest(actions.GET_USER_PROFILE_WATCHER, fetchSelfActionEffect);
}

/* ---------------------------------------------------------------------------------------------------- */

/**
 * Logout Operation using Saga.
 *
 * Saga function that handles the side effect when the logoutActionWatcher is triggered.
 */
export function* logoutActionEffect() {
  try {
    localStorage.clear();
    alert.clearAll();
    yield put(clearSession());
    yield put(push('/login'));
  } catch (e) {
    yield put(authError(e));
  }
}

/**
 * Saga function that is initiated in the beginning to be able to listen to LOG_OUT_WATCHER action.
 */
export function* logoutActionWatcher() {
  yield takeLatest(actions.LOG_OUT_WATCHER, logoutActionEffect);
}

/* ---------------------------------------------------------------------------------------------------- */
