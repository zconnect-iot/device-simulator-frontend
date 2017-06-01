import { apifetch } from 'api'
import C from 'containers/Device/constants'
import { selectSelectedDevice } from 'containers/Device/selectors'

export function setVariableSuccess() {
  return {
    type: C.SET_VARIABLE_SUCCESS,
  }
}

export function setVariableFailed(error) {
  return {
    type: C.SET_VARIABLE_FAILED,
    error,
  }
}

export function setVariable(variable, value) {
  return (dispatch, getState) => {
    dispatch({
      type: C.SET_VARIABLE,
      variable,
      value,
    })
    const id = selectSelectedDevice(getState())
    apifetch({ url: `/api/v1/${id}/variables`, payload: { [variable]: value } })
      .then(() => dispatch(setVariableSuccess()))
      .catch(error => dispatch(setVariableFailed(error)))
  }
}
