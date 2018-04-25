import React from 'react';
import { testSaga } from 'redux-saga-test-plan';

import { push } from 'react-router-redux';

import * as actions from '../../../constants/actions';

import { loginActionEffect, fetchSelfActionEffect, logoutActionEffect } from '../../../store/sagas/session';

describe('When Saga Session Effects are triggered', () => {
  it('should trigger logoutActionEffect() Saga', () => {
    const clearSession = jest.fn(() => ({ type: actions.CLEAR_SESSION, payload: null }));

    const expectLocalStorageClearToHaveBeenCalled = jest.fn(() => {
      localStorage.clear();
      expect(localStorage.clear).toHaveBeenCalledTimes(1);
    });

    testSaga(logoutActionEffect)
      .next(expectLocalStorageClearToHaveBeenCalled())
      .put(clearSession())
      .next()
      .put(push('/login'))
      .next()
      .isDone();
  });
});
