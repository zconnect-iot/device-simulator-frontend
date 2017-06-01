import React, { PropTypes } from 'react'

export default function ListGroup(props) {
  const { title, items, renderRow } = props
  return (<ul className="list-group">
    <li className="list-group-header">{title}</li>
    { items.map(item => (
      <li key={item.name} className="list-group-item">
        { !!item.value && <span
          className="list-group-progress"
          style={{ width: `${Math.min(((item.value - item.min) / (item.max - item.min)) * 100, 100)}%` }}
        /> }
        { renderRow(item) }
      </li>)) }
  </ul>)
}

ListGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  })).isRequired,
  renderRow: PropTypes.func.isRequired,
}
