/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable'
import C from './constants'

export const initialState = {
  authenticated: false,
  fetching: false,
  error: false,
  status: null,
}

const _initialState = fromJS(initialState)

function authReducer(state = _initialState, action) {
  switch (action.type) {
    case C.SUBMIT_LOGIN:
      return state
        .set('authenticated', false)
        .set('fetching', true)
        .set('error', false)
        .set('status', 'Authenticating')

    case C.LOGIN_USER:
      return state
        .set('authenticated', true)
        .set('fetching', false)
        .set('error', false)
        .set('status', 'Logged in')

    case C.LOGOUT_USER:
      return state
        .set('authenticated', false)
        .set('fetching', false)
        .set('error', false)
        .set('status', 'Logged out')

    case C.LOGIN_ERROR:
      return state
        .set('authenticated', false)
        .set('fetching', false)
        .set('error', true)
        .set('status', action.status)

    default:
      return state
  }
}

export default authReducer
