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

// export const selectCurrentValue = createSelector(
//   selectVariables,
//   selectVariableFromProps,
//   (variables, variable) => variables.getIn([variable, 'value']),
// )
//
// export const selectMinimum = createSelector(
//   selectVariables,
//   selectVariableFromProps,
//   (variables, variable) => variables.getIn([variable, 'min']),
// )
//
// export const selectMaximum = createSelector(
//   selectVariables,
//   selectVariableFromProps,
//   (variables, variable) => variables.getIn([variable, 'max']),
// )
