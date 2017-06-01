import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Variable from 'containers/Variable'
import { selectVariablesList } from './selectors'


function Variables({ variables }) {
  return (
    <div>
      <h4>Variables</h4>
      { variables.map(variable => <Variable {...variable} />) }
    </div>
  )
}

Variables.propTypes = {
  variables: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  })).isRequired,
}

function mapStateToProps(state) {
  return {
    variables: selectVariablesList(state),
  }
}

export default connect(
  mapStateToProps,
)(Variables)
