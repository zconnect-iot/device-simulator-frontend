import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import device from 'containers/Device/reducer'

import auth from 'auth/reducer'

export default combineReducers({
  auth,
  form,
  device,
})
