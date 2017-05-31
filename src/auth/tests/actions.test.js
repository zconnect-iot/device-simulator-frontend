import { fromJS } from 'immutable'

import * as actions from '../actions'
import { LOGOUT_USER, LOGIN_USER, LOGIN_ERROR, SUBMIT_LOGIN } from '../constants'

// Auth tokens:
describe('Auth Actions', () => {

  describe('Token Actions', () => {
    test('should get auth token', () => {
        localStorage.removeItem('token')
        actions.storeAuthToken('testtoken')
        expect(actions.getAuthToken()).toEqual('testtoken')
        actions.deleteAuthToken()
        expect(actions.getAuthToken()).toEqual(undefined)

    })
  })

  // User state.
  describe('Auth userstate Actions', () => {
    test('loginUserState should update api state', () => {
        expect(actions.loginUserState()).toEqual(
          { type: LOGIN_USER }
        )
    })

    test('logoutUserState should update api state', () => {
        expect(actions.logoutUserState()).toEqual(
          { type: LOGOUT_USER }
        )
    })

    test('submitLoginDetails should update api state', () => {
        let payload = fromJS({
          'email': '123',
          'password': 'erwerwer'
        })
        let redirect = '/123'
        expect(actions.submitLoginDetails(payload, redirect)).toEqual(
          { type: SUBMIT_LOGIN, payload: payload.toJS(), redirect: redirect }
        )
    })

    test('should update api state with 404', () => {
        let error = {status: 404}
        let status = 'Username or password invalid.'
        expect(actions.loginError(error)).toEqual(
          { type: LOGIN_ERROR, status: status }
        )
    })

    test('should update api state with error', () => {
        let error = {status: 400}
        let status = 'There was an error, please try again later.'
        expect(actions.loginError(error)).toEqual(
          { type: LOGIN_ERROR, status: status }
        )
    })

  })
});
