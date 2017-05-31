import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import createLogger from 'redux-logger'


const isProduction = process.env.NODE_ENV === 'production'

// Creating store
let store = null

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
  const enhancer = compose(
    middleware,
    // Enable DevTools if browser extension is installed
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  )

  store = createStore(
    rootReducer,
    enhancer,
  )
}

export default store
