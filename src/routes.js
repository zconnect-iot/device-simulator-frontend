import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from 'containers/App'
import Login from 'containers/Login'
import Dashboard from 'containers/Dashboard'
import Device from 'containers/Device'
import NotFound from 'components/NotFound'

const publicPath = '/'

export const routeCodes = {
  DASHBOARD: publicPath,
  LOGIN: `${publicPath}login`,
  DEVICE: `${publicPath}device/:id`,
}

export default function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path={publicPath} component={App} >
        <IndexRoute component={Dashboard} />
        <Route path={routeCodes.DEVICE} component={Device} />
        <Route path={routeCodes.LOGIN} component={Login} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  )
}
