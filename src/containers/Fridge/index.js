import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectInternalTemperature } from 'containers/Fridge/selectors'
// Don't question this webpack magic!
import FridgeSVG from '-!svg-react-loader?name=FridgeSVG!assets/images/fridge.svg'
import { Image } from 'react-bootstrap'
import * as chroma from 'chroma-js'

import styles from './styles.scss'

console.log(chroma)

const convertTempToColour = (temperature) => {
  //blue colour at 5 and red at 8, fade in between
  const blue = 3.0
  const red = 5.0

  //Clamp the temperature between 4.1 and 7.9
  const temp = Math.min(Math.max(temperature, blue + 0.1), red - 0.1)
  console.log("temp", temp)
  const ratio = (temp - blue) / (red - blue)
  console.log(ratio)


  let scale = chroma.scale(['blue', 'black', 'red']).mode('lab')
  return scale(ratio).hex()
}

class Fridge extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() {
    console.log("Temperature: ", this.props.temperature)
    const colour = convertTempToColour(this.props.temperature)
    return (
        <FridgeSVG fill={colour}/>
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
