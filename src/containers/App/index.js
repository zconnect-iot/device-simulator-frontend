import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { isAuthenticated } from 'auth/selectors'

import styles from './styles.scss'

class App extends React.Component {
  componentDidMount() {
    const { isAuthenticated, path } = this.props
    if (!isAuthenticated && path !== 'login') browserHistory.push('/login')
  }
  render() {
    // if (this.props.isAuthenticated) return null
    return (
      <div className={styles.App}>
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
