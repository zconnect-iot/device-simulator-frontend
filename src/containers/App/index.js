import React from 'react'
import { connect } from 'react-redux'

import { getAuthToken, logoutUser, loginUserState } from 'auth/actions'

import styles from './styles.scss'

class App extends React.Component {

  componentWillMount() {
    if (!getAuthToken()) this.props.logOutUser()
    else this.props.logInUser()
  }

  render() {
    return (
      <div className={styles.App}>
        {this.props.children}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logOutUser: () => dispatch(logoutUser()),
    logInUser: () => dispatch(loginUserState()),
  }
}


export default connect(
  null,
  mapDispatchToProps,
)(App)
