import { browserHistory } from 'react-router'
import { apifetch } from 'api'
import C from './constants'


// Interface here with the assumption of using different storage in future.
export const getAuthToken = () => localStorage.token
export const storeAuthToken = token => localStorage.token = token
export const deleteAuthToken = () => localStorage.removeItem('token')
// For password reset auth.
// TODO: test
export const getPasswordResetToken = () => localStorage.passwordResetToken
export const storePasswordResetToken = token => localStorage.passwordResetToken = token
export const deletePasswordResetToken = () => localStorage.removeItem('passwordResetToken')


export const submitLoginDetails = (payload, redirect = '/') => (dispatch) => {
  dispatch({ type: C.SUBMIT_LOGIN })
  apifetch({ url: '/api/v1/auth', payload, tokenAuth: false })
    .then((payload) => {
      storeAuthToken(payload.access_token)
      dispatch(loginUserState())
      browserHistory.push(redirect)
    })
    .catch(error => dispatch(loginError(error)))
}

export const loginUserState = () => ({ type: C.LOGIN_USER })
export const logoutUserState = () => ({ type: C.LOGOUT_USER })

export const logoutUser = () => (dispatch) => {
  deleteAuthToken()
  browserHistory.push('/login')
  dispatch(logoutUserState())
}

export const loginError = (error) => {
  let status = 'There was an error, please try again later.'
  if (error.status === 404) { status = 'Username or password invalid.' }

  return { type: C.LOGIN_ERROR, status }
}
