import React, { PropTypes } from 'react'

export default function Modal(props) {
  const { title, children, onClose, visible } = props
  if (!visible) return null
  return (<div className="modal">
    <div className="modal-dialog modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          { onClose && <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span></button> }
        </div>
        <div className="modal-body modal-body-scroller">
          {children}
        </div>
      </div>
    </div>
  </div>)
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  children: null,
  visible: true,
  onClose: null,
}
