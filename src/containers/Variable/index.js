import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-bootstrap-slider'

import { setVariable } from './actions'
import { selectTargetValue } from './selectors'
import styles from './styles.scss'


class Variable extends React.Component {

  onChange = ({ target }) => {
    this.props.setVariable(target.value)
  }

  render() {
    const { name, value, target, min, max } = this.props
    return (
      <div>
        <div className={styles.variableLabel}>
          <span>{name}: {Math.round(value * 100) / 100}</span>
          { target !== undefined && <span className={styles.variableTarget}>{`target: ${target}`}</span> }
        </div>
        <Slider
          value={target || value}
          slideStop={this.onChange}
          step={max < 2 ? 0.01 : 1}
          max={max}
          min={min}
        />
      </div>
    )
  }
}

Variable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  target: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setVariable: PropTypes.func.isRequired,
}

function mapStateToProps(state, props) {
  return {
    target: selectTargetValue(state, props),
  }
}

function mapDispatchToProps(dispatch, props) {
  const { name } = props
  return {
    setVariable: value => dispatch(setVariable(name, value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Variable)
