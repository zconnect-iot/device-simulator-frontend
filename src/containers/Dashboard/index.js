import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Dashboard extends React.Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <ul className="list-group">
          <li className="list-group-header">Virtual Devices</li>
          <li className="list-group-item">
            <Link to="/device/ac7d6798cd66a96d97c6aca">ac7d6798cd66a96d97c6aca</Link>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
