import React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-bootstrap-slider'

import ListGroup from 'widgets/ListGroup'

import { selectVariablesList } from './selectors'
import styles from './styles.scss'


class Variables extends React.Component {

  changeValue(args) {
    console.log(args)
  }

  renderRow = ({ label, value }) => {
    return (
      <div>
        <div className={styles.variableLabel}>
          {label}: {Math.round(value * 100) / 100}
        </div>
        <Slider
          value={value}
          change={this.changeValue}
          slideStop={this.changeValue}
          step={1}
          max={100}
          min={0}
        />
      </div>
    )
  }

  render() {
    const { variables } = this.props
    return (
      <ListGroup
        items={variables}
        title="Variables"
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    variables: selectVariablesList(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Variables)
