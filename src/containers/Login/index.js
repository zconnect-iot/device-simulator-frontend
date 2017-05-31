import React from 'react'
import { connect } from 'react-redux'

import { submitLoginDetails, getAuthToken, logoutUserState } from 'auth/actions'
import selectAuth from 'auth/selectors'

import Modal from 'widgets/Modal'
import LoginForm from './LoginForm'

import styles from './styles.scss'

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (!getAuthToken()) this.props.logoutUserState()
  }

  handleSubmit = (payload) => {
    const redirect = this.props.location.search.split('=')[1]
    this.props.submitLoginDetails(payload, redirect)
  }

  render() {
    const { authState } = this.props
    return (
      <Modal title="Zconnect Virtual Device Controller">
        <LoginForm onSubmit={this.handleSubmit} />

        {authState.error ?
          <p className={styles.errorText}>{authState.status}</p>
        :
          <p className={styles.statusText}>{authState.status}</p>
        }
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  authState: selectAuth(state),
})

function mapDispatchToProps(dispatch) {
  return {
    logoutUserState: () => dispatch(logoutUserState()),
    submitLoginDetails: (payload, redirect) => dispatch(submitLoginDetails(payload, redirect)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
