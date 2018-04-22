import { all } from 'redux-saga/effects';

import { loginActionWatcher, logoutActionWatcher, fetchSelfActionWatcher } from '../sagas/session';

/**
 * Redux Saga uses the `all` function to combine multiple sagas to one root saga for the Redux store.
 *
 * Each saga - what we pass to the `sagaMiddleware.run/runSaga` and every generator passed into the `call`, `apply`,
 * `fork`, `spawn`, `all`, race effects is internally becoming a Task. So if we add another layer of the generators
 * in between they all get instances internally etc.
 *
 * Every effect is just an object we can actually export them instead of the generators.
 */
export default function* rootSaga() {
  yield all([loginActionWatcher(), logoutActionWatcher(), fetchSelfActionWatcher()]);
}
