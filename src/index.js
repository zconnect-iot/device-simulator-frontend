import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store'
import Routes from 'routes'
import 'babel-polyfill'


// Load SCSS
import './scss/app.scss'


// Render it to DOM
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
