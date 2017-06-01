import { apifetch } from 'api'
import C from 'containers/Device/constants'
import { selectSelectedDevice } from 'containers/Device/selectors'

export function setVariable(variable, value) {
  return {
    type: C.SET_VARIABLE,
    variable,
    value,
  }
}

export function submitVariableSuccess() {
  return {
    type: C.SUBMIT_VARIABLE_SUCCESS,
  }
}

export function submitVariableFailed(error) {
  return {
    type: C.SUBMIT_VARIABLE_FAILED,
    error,
  }
}

export function submitVariable(variable, value) {
  return (dispatch, getState) => {
    dispatch({
      type: C.SUBMIT_VARIABLE,
      variable,
      value,
    })
    const id = selectSelectedDevice(getState())
    apifetch({ url: `/api/v1/${id}/variables`, payload: { [variable]: value } })
      .then(() => dispatch(submitVariableSuccess()))
      .catch(error => dispatch(submitVariableFailed(error)))
  }
}
