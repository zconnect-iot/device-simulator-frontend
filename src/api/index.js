import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import config from 'config'
import { getAuthToken, deleteAuthToken, getPasswordResetToken } from 'auth/actions'

const { rootDomain, apiPort } = config

export function getHeaders(tokenAuth, resetToken) {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (tokenAuth) {
    const token = resetToken ? getPasswordResetToken() : getAuthToken()
    headers.append('Authorization', `Bearer ${token}`)
  }
  return headers
}

export function apifetch({ url, payload, tokenAuth = true, resetToken = false }) {
  let fullUrl = url
  if (url.indexOf('http://') < 0) { // domain not in url
    fullUrl = `http://${rootDomain}:${apiPort}${url}`
  }
  const headers = getHeaders(tokenAuth, resetToken)
  const conf = {
    method: 'get',
    headers,
    mode: 'cors',
    cache: 'default',
  }
  if (payload) {
    conf.method = 'post'
    conf.body = JSON.stringify(payload)
  }

  return fetch(fullUrl, conf)
    .then((response) => {
      if (response.status === 401) {
        // Effectively logs user out but doesn't dispatch/update state.
        // Instead it's picked up in the Auth component which logs out user.
        deleteAuthToken()
        browserHistory.push('/login')
      }
      if (response.status >= 400) throw new Error('Bad response from server')
      return response.json()
    })
}
