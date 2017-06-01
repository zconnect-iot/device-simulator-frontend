import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import Slider from 'react-bootstrap-slider'


import ListGroup from 'widgets/ListGroup'
import FridgeSVG from 'assets/images/fridge.svg'

import { startPolling, stopPolling } from './actions'
import { selectVariablesList, selectStateList } from './selectors'
import styles from './styles.scss'

function renderStateRow({ label, value }) {
  return <span className={styles.variableLabel}>{label}: {Math.round(value * 100) / 100}</span>
}

function renderVariableRow({ label, value, changeValue }) {
  return (
    <div>
      <div className={styles.variableLabel}>
        {label}: {Math.round(value * 100) / 100}
      </div>
      <Slider
        value={value}
        change={changeValue}
        slideStop={changeValue}
        step={1}
        max={100}
        min={0}
      />
    </div>
  )
}

class Device extends React.Component {

  componentDidMount() {
    this.props.startPolling(this.props.params.id)
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  changeValue(args) {
    console.log(args)
  }

  render() {
    const { params, variables, state } = this.props
    return (
      <div className={styles.Device}>
        <div className={styles.Left}>
          <Image src={FridgeSVG} responsive />
        </div>
        <div className={styles.Right}>
          <ListGroup
            items={variables.map(v => ({ ...v, changeValue: this.changeValue }))}
            title="Variables"
            renderRow={renderVariableRow}
          />
          <ListGroup
            items={state}
            title="State"
            renderRow={renderStateRow}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    variables: selectVariablesList(state),
    state: selectStateList(state),
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
