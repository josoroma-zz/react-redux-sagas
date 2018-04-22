import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import session from './session';

/**
 * Split our reducing function into separate functions, each managing independent parts of the state.
 * `combineReducers` helper function turns an object whose values are different reducing functions
 * into a single reducing function you can pass to createStore.
 *
 * The resulting reducer calls every child reducer, and gathers their results into a single state object.
 * The state produced by combineReducers() namespaces the states of each reducer under their keys as
 * passed to combineReducers().
 *
 * - https://redux.js.org/api-reference/combinereducers
 */
const rootReducer = combineReducers({ session, router });

export default rootReducer;
