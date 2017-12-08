import React from 'react'
import { connect } from 'react-redux'

import { selectStateList } from './selectors'
import styles from './styles.scss'

function Sensor({ name, value, min, max, human_name}) {
  return (
    <div className={styles.Sensor}>
      <div className={styles.sensorLabel}>
        {human_name}
        <span>
          {Math.round(value * 100) / 100}
        </span>
      </div>
      <div className={styles.sensorLevel}>
        <span
          className="list-group-progress"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  )
}

const isAllowed = sensor => !(
  ['ts', 'send_ts', 'temp_in_max', 'temp_in_min', 'current_draw']
  .includes(sensor.name)
)

function Sensors({ sensors }) {
  return (
    <div>
      <h4>Sensors</h4>
      {
        sensors
        .filter(isAllowed)
        .map(sensor => <Sensor key={sensor.name} {...sensor} />)
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sensors: selectStateList(state),
  }
}


export default connect(
  mapStateToProps,
)(Sensors)
