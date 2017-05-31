import { createSelector } from 'reselect'

const selectAuthDomain = state => state.get('auth')

const selectAuth = createSelector(
  selectAuthDomain,
  substate => substate.toJS(),
)

const isAuthenticated = createSelector(
  selectAuthDomain,
  substate => substate.get('authenticated'),
)

export default selectAuth
export {
  selectAuth,
  isAuthenticated,
  selectAuthDomain,
}
