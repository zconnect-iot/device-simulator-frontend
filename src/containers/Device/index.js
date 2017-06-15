import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import Fridge from 'containers/Fridge'

import { selectIsDirty } from 'containers/Variable/selectors'
import Button from 'widgets/Button'

import Variables from './Variables'
import Sensors from './Sensors'
import { startPolling, stopPolling, reset } from './actions'

import styles from './styles.scss'


class Device extends React.Component {

  componentDidMount() {
    this.props.startPolling(this.props.params.id)
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  render() {
    const { params } = this.props
    return (
      <div className={styles.Device}>
        <div className={styles.Left}>
          <h3>{params.id}</h3>
          <Fridge />
        </div>
        <div className={styles.Right}>
          <Variables />
          <Sensors />
          { <Button onClick={this.props.reset} danger>RESET</Button> }
        </div>
      </div>
    )
  }
}

Device.propTypes = {
  startPolling: PropTypes.func.isRequired,
  stopPolling: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

function mapStateToProps(state) {
  return {
    isDirty: selectIsDirty(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startPolling: id => dispatch(startPolling(id)),
    stopPolling: () => dispatch(stopPolling()),
    reset: () => dispatch(reset()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Device)
