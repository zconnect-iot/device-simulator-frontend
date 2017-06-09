import config from 'config'
import { apifetch } from 'api'
import C from './constants'
import { selectSelectedDevice } from './selectors'

let timer

export function fetchStatus() {
  return (dispatch, getState) => {
    const id = selectSelectedDevice(getState())
    dispatch({ type: C.FETCH_STATUS, id })
      apifetch({ url: `/api/v1/device/${id}/status` })
      .then(payload => dispatch(fetchStatusSuccess(payload)))
      .catch(error => dispatch(fetchStatusFailed(error)))
  }
}

export function sendReset() {
  console.log('Send Reset')
  return (dispatch, getState) => {
    const id = selectSelectedDevice(getState())
    dispatch({
      type: C.SEND_RESET,
      id,
    })
    apifetch({ url: `/api/v1/device/${id}/reset`, method: 'post' })
    .then(payload => dispatch(resetSuccess(payload)))
    .catch(error => dispatch(resetFailed(error)))
  }
}

export function startPolling(id) {
  return (dispatch) => {
    dispatch({ type: C.START_POLLING, id })
    dispatch(fetchStatus())
  }
}

export function stopPolling() {
  return {
    type: C.STOP_POLLING,
  }
}

export function fetchStatusSuccess(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: C.FETCH_STATUS_SUCCESS,
      payload,
    })
    clearTimeout(timer)
    if (selectSelectedDevice(getState())) {
      timer = setTimeout(() => dispatch(fetchStatus()), config.pollingInterval)
    }
  }
}

export function fetchStatusFailed(error) {
  return (dispatch, getState) => {
    dispatch({
      type: C.FETCH_STATUS_FAILED,
      error,
    })
    clearTimeout(timer)
    if (selectSelectedDevice(getState())) {
      timer = setTimeout(() => dispatch(fetchStatus()), config.pollingInterval)
    }
  }
}

export function resetFailed(error) {
  return (dispatch) => {
    dispatch({
      type: C.SEND_RESET_FAILED,
      error,
    })
  }
}

export function resetSuccess(error) {
  return (dispatch) => {
    dispatch({
      type: C.SEND_RESET_SUCCESS,
      error,
    })
  }
}

export function reset() {
  console.log('Reset')
  return (dispatch) => {
    dispatch({ type: C.SEND_RESET })
    dispatch(sendReset())
  }
}
