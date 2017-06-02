import { createSelector } from 'reselect'

const selectDeviceDomain = state => state.get('device')

const selectStatus = createSelector(
  selectDeviceDomain,
  device => device.get('status'),
)

const selectTargets = createSelector(
  selectDeviceDomain,
  device => device.get('targets'),
)

export const selectVariables = createSelector(
  selectStatus,
  status => status.get('variables'),
)

const selectVariableFromProps = (_, { name }) => name

export const selectTargetValue = createSelector(
  selectTargets,
  selectVariableFromProps,
  (targets, variable) => targets.get(variable),
)

export const selectIsDirty = createSelector(
  selectTargets,
  targets => !!targets.size,
)
