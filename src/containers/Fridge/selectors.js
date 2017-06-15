import { createSelector } from 'reselect'

import { selectState } from 'containers/Device/selectors'

export const selectInternalTemperature = createSelector(
  selectState,
  state => Object.entries(state)
)