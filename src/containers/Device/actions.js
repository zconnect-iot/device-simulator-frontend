import config from 'config'
import { apifetch } from 'api'
import C from './constants'
import { selectSelectedDevice } from './selectors'

let timer

export function fetchStatus() {
  return (dispatch, getState) => {
    const id = selectSelectedDevice(getState())
    dispatch({ type: C.FETCH_STATUS, id })
    apifetch({ url: `/api/v1/${id}/status` })
      .then(payload => dispatch(fetchStatusSuccess(payload)))
      .catch(error => dispatch(fetchStatusFailed(error)))
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

export function reset() {
  return {
    type: C.RESET_VARIABLES,
  }
}
