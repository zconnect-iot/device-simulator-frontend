import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import createLogger from 'redux-logger'


const isProduction = process.env.NODE_ENV === 'production'

// Creating store
let store = null

const dtPresent = window.__REDUX_DEVTOOLS_EXTENSION__
const maybeEnhanceWithReduxDevtools = (middleware) => (
  dtPresent ? compose(middleware, dtPresent()) : middleware
)

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk)

  store = createStore(
    rootReducer,
    middleware,
  )
} else {
  // In development mode beside thunk
  // logger and DevTools are added
  // Redux logger
  const logger = createLogger({
    stateTransformer: state => state.toJS(),
  })
  const middleware = applyMiddleware(thunk, logger)

  store = createStore(
    rootReducer,
    maybeEnhanceWithReduxDevtools(middleware),
  )
}

export default store
