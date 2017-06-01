import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'

import FridgeSVG from 'assets/images/fridge.svg'

import Variables from './Variables'
import Sensors from './Sensors'
import { startPolling, stopPolling } from './actions'
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
          <Image src={FridgeSVG} responsive />
        </div>
        <div className={styles.Right}>
          <Variables />
          <Sensors />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startPolling: id => dispatch(startPolling(id)),
    stopPolling: () => dispatch(stopPolling()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Device)
