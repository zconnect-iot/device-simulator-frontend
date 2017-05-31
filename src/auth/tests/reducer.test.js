import { fromJS } from 'immutable';

import authReducer, { initialState } from '../reducer';

import {
  LOGIN_USER, LOGOUT_USER, LOGIN_ERROR, SUBMIT_LOGIN
} from '../constants';

var initState = fromJS(initialState)

describe('auth reducer', () => {
  test('returns the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initState);
  })

  test('submit login', () => {
    let action = {type: SUBMIT_LOGIN}
    expect(authReducer(initState, action).get('authenticated')).toEqual(false);
    expect(authReducer(initState, action).get('fetching')).toEqual(true);
    expect(authReducer(initState, action).get('error')).toEqual(false);
    expect(authReducer(initState, action).get('status')).toEqual('Authenticating');
  })

  test('login user', () => {
    let action = {type: LOGIN_USER}
    expect(authReducer(initState, action).get('authenticated')).toEqual(true);
    expect(authReducer(initState, action).get('fetching')).toEqual(false);
    expect(authReducer(initState, action).get('error')).toEqual(false);
    expect(authReducer(initState, action).get('status')).toEqual('Logged in');
  })

  test('logout user', () => {
    let action = {type: LOGOUT_USER}
    expect(authReducer(initState, action).get('authenticated')).toEqual(false);
    expect(authReducer(initState, action).get('fetching')).toEqual(false);
    expect(authReducer(initState, action).get('error')).toEqual(false);
    expect(authReducer(initState, action).get('status')).toEqual('Logged out');
  })

  test('login error', () => {
    let action = {type: LOGIN_ERROR, status: 'action status'}
    expect(authReducer(initState, action).get('authenticated')).toEqual(false);
    expect(authReducer(initState, action).get('fetching')).toEqual(false);
    expect(authReducer(initState, action).get('error')).toEqual(true);
    expect(authReducer(initState, action).get('status')).toEqual(action.status);

  })

});
