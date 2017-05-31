import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { isAuthenticated } from 'auth/selectors'

class App extends React.Component {
  componentDidMount() {
    const { isAuthenticated, path } = this.props
    if (!isAuthenticated && path !== 'login') browserHistory.push('/login')
  }
  render() {
    // if (this.props.isAuthenticated) return null
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: isAuthenticated(state),
    path: ownProps.location.pathname,
  }
}

export default connect(mapStateToProps)(App)
