import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Image } from 'react-bootstrap'
import Slider from 'react-bootstrap-slider'


import ListGroup from 'widgets/ListGroup'
import FridgeSVG from 'assets/images/fridge.svg'

import { startPolling, stopPolling } from './actions'
import { selectVariablesList, selectStateList } from './selectors'
import styles from './styles.scss'

function renderStateRow({ label, value }) {
  return <span>{label}: {Math.round(value * 100) / 100}</span>
}

function renderVariableRow({ label, value, changeValue }) {
  return (
    <div>
      <div>{label}</div>
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
      <div>
        <h3>Device: {params.id}</h3>
        <Row>
          <Col sm={8}>
            <Image src={FridgeSVG} className={styles.Fridge} responsive />
          </Col>
          <Col sm={4} className={styles.Controls}>
            <ListGroup
              items={state}
              title="State"
              renderRow={renderStateRow}
            />
            <ListGroup
              items={variables.map(v => ({ ...v, changeValue: this.changeValue }))}
              title="Variables"
              renderRow={renderVariableRow}
            />
          </Col>
        </Row>
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
