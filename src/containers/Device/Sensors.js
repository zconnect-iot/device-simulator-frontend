import React from 'react'
import { connect } from 'react-redux'

import ListGroup from 'widgets/ListGroup'

import { selectStateList } from './selectors'
import styles from './styles.scss'

class Sensors extends React.Component {

  renderRow = ({ name, value }) => {
    return (<span className={styles.variableLabel}>
      {name}: {Math.round(value * 100) / 100}
    </span>)
  }

  render() {
    const { state } = this.props
    return (
      <ListGroup
        items={state}
        title="Sensors"
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    state: selectStateList(state),
  }
}


export default connect(
  mapStateToProps,
)(Sensors)
