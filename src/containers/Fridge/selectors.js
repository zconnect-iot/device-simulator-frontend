import { createSelector } from 'reselect'

import { selectStatus } from 'containers/Device/selectors'

export const selectState = createSelector(
  selectStatus,
  status => status.get('state'),
)

export const selectInternalTemperature = createSelector(
  selectState,
  state => {
      return state.getIn(['box-temp', 'value'])
  }

)
