import { fromJS } from 'immutable'

import * as sel from '../selectors'
import { initialState } from '../reducer'

const initState = fromJS(initialState)

describe('Auth selectors', () => {

  test('Should access auth state domain', () => {
    let state = fromJS({auth: initState})
    let selector = sel.selectAuth(state)
    expect(selector.hasOwnProperty('authenticated')).toEqual(true)
  })

  test('Should indicate if authenticated', () => {
    let state = fromJS({auth: initState})
    let selector = sel.selectAuthenticated(state)
    expect(selector).toEqual(false)
  })

});
