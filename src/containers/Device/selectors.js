import { createSelector } from 'reselect'

import { sortAlphaNum } from 'utils'

const selectDeviceDomain = state => state.get('device')

export const selectSelectedDevice = createSelector(
  selectDeviceDomain,
  device => device.getIn(['api', 'polling']),
)

export const selectStatus = createSelector(
  selectDeviceDomain,
  device => device.get('status'),
)

export const selectVariables = createSelector(
  selectStatus,
  status => status.get('variables').toJS(),
)

export const selectVariablesList = createSelector(
  selectVariables,
  variables => Object.entries(variables)
    .map(item => ({ name: item[0], ...item[1] }))
    .sort((a, b) => sortAlphaNum(a.name, b.name)),
)

export const selectState = createSelector(
  selectStatus,
  status => status.get('state').toJS(),
)

export const selectStateList = createSelector(
  selectState,
  state => Object.entries(state)
    .map(item => ({ name: item[0], ...item[1] }))
    .sort((a, b) => sortAlphaNum(a.name, b.name)),
)
