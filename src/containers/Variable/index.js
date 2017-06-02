import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-bootstrap-slider'

import { submitVariable, setVariable } from './actions'
import { selectTargetValue } from './selectors'
import styles from './styles.scss'


class Variable extends React.Component {

  onChanged = ({ target }) => {
    this.props.submitVariable(target.value)
  }

  onChange = ({ target }) => {
    // Needed to prevent status response overriding the value whilst sliding
    this.props.setVariable(target.value)
  }

  render() {
    const { name, value, target, min, max } = this.props
    return (
      <div className={styles.Variable}>
        <div className={styles.variableLabel}>
          {name}
          <span>{(target || value).toFixed(2)}</span>
        </div>
        <div className={styles.variableSlider}>
          <Slider
            value={target || value}
            slideStop={this.onChanged}
            change={this.onChange}
            step={max < 2 ? 0.01 : 1}
            max={max}
            min={min}
          />
        </div>
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
  submitVariable: PropTypes.func.isRequired,
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
    submitVariable: value => dispatch(submitVariable(name, value)),
    setVariable: value => dispatch(setVariable(name, value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Variable)
