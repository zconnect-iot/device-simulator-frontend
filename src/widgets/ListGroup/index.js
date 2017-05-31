import React, { PropTypes } from 'react'

export default function ListGroup(props) {
  const { title, items, renderRow } = props
  return (<ul className="list-group">
    <li className="list-group-header">{title}</li>
    { items.map(item => (
      <li key={item.label} className="list-group-item">
        { item.value && <span className="list-group-progress" style={{ width: `${item.value}%` }} /> }
        { renderRow(item) }
      </li>)) }
  </ul>)
}

ListGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
  })).isRequired,
}
