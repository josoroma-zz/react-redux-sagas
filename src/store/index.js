import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './sagas';
import reducers from './reducers';

/**
 * Manage session history.
 * `history` provides a minimal API to manage the history stack, navigate, confirm navigation,
 * and persist state between sessions.
 *
 * - https://github.com/ReactTraining/history#usage
 */
const history = createHistory();

/**
 * Creates a Redux middleware and connects the Sagas to the Redux Store.
 *
 * - https://github.com/redux-saga/redux-saga/tree/master/docs/api#createsagamiddlewareoptions
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Middlewares for redux. For intercepting and dispatching navigation actions.
 * Simple bindings to keep react-router and redux in sync.
 *
 * - https://github.com/reactjs/react-router-redux
 */
const historyMiddleware = routerMiddleware(history);

let middlewares;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  middlewares = applyMiddleware(historyMiddleware, sagaMiddleware);
} else {
  /**
   * Lets us replay problems as if they happened in your own browser.
   * Replay Redux actions + state, network requests, console logs, and see a video of what the user saw.
   *
   * - https://github.com/evgenyrodionov/redux-logger
   */
  middlewares = applyMiddleware(logger, historyMiddleware, sagaMiddleware);
}

/**
 * Creates a Redux store that holds the complete state tree.
 *
 * Mount it on the Store.
 *
 * - https://github.com/reactjs/redux/blob/master/docs/api/createStore.md
 */
const store = createStore(
  reducers,
  compose(
    middlewares,
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' &&
    process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension()
      : f => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;

export { history };
