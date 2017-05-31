import { fromJS } from 'immutable'
import C from './constants'

const initialState = fromJS({
  api: {
    polling: false,
    fetching: false,
    error: false,
  },
  status: {
    variables: {},
    state: {},
  },
})

export default function (state = initialState, action) {
  switch (action.type) {
    case C.START_POLLING:
      return state
        .setIn(['api', 'polling'], action.id)

    case C.STOP_POLLING:
      return state
        .setIn(['api', 'polling'], false)

    case C.FETCH_STATUS:
      return state
        .setIn(['api', 'fetching'], true)
        .setIn(['api', 'error'], false)

    case C.FETCH_STATUS_SUCCESS:
      return state
        .set('status', fromJS(action.payload))
        .setIn(['api', 'fetching'], false)

    case C.FETCH_STATUS_FAILED:
      return state
        .setIn(['api', 'fetching'], false)
        .setIn(['api', 'error'], true)
        .set('status', fromJS({
          variables: {},
          state: {},
        }))

    default:
      return state
  }
}
