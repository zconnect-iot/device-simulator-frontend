import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectInternalTemperature } from 'containers/Fridge/selectors'
import FridgeSVG from 'assets/images/fridge.svg'
import { Image } from 'react-bootstrap'

import styles from './styles.scss'


class Fridge extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() {
    return (
      <Image src={FridgeSVG} responsive />
    )
  }
}

Fridge.propTypes = {
  temperature: PropTypes.number,
}

function mapStateToProps(state, props) {
  return {
    temperature: selectInternalTemperature(state, props),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Fridge)
