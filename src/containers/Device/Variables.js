import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ListGroup from 'widgets/ListGroup'

import Variable from 'containers/Variable'
import { selectVariablesList } from './selectors'


class Variables extends React.Component {
  renderRow = props => <Variable {...props} />
  render() {
    return (
      <ListGroup
        items={this.props.variables}
        title="Variables"
        renderRow={this.renderRow}
      />
    )
  }
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
