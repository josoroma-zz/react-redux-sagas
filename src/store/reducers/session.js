import * as actions from '../../constants/actions';

/**
 * One of the core tenets of Redux is to never mutate state.
 *
 * Use the spread (...) operator to copy enumerable properties from one object to another in a more succinct way.
 *
 * - https://redux.js.org/recipes/using-object-spread-operator
 */

/**
 * It's important to note that when an action is dispatched to the store, the middleware first forwards the action
 * to the reducers and then notifies the Sagas. This means that when you query the Store's State, you get the State
 * after the action has been applied. However, this behavior is only guaranteed if all subsequent middlewares
 * call next(action) synchronously.
 *
 * If any subsequent middleware calls next(action) asynchronously (which is unusual but possible), then the sagas
 * will get the state from before the action is applied. Therefore it is recommended to review the source of each
 * subsequent middleware to ensure it calls next(action) synchronously, or else ensure that redux-saga is the last
 * middleware in the call chain.
 *
 * - https://redux-saga.js.org/docs/api/index.html#selectselector-args
 */

const initialState = {
  user: null,
  error: null
};

const session = (state = initialState, action) => {
  switch (action.type) {
    // FILL_USER_PROFILE.
    case actions.FILL_USER_PROFILE:
      return {
        ...state,
        user: { ...action.payload }
      };

    // CLEAR_SESSION.
    case actions.CLEAR_SESSION:
      return { ...initialState };

    // AUTH_ERROR.
    case actions.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };

    // DEFAULT.
    default:
      return state;
  }
};

export default session;
