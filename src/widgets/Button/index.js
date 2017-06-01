import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default function Button(props) {
  const { children, className, danger, ...otherProps } = props
  return (
    <button
      className={classnames('btn', `btn-${danger ? 'danger' : 'success'}`, className)}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
}

Button.defaultProps = {
  className: null,
  children: null,
  disabled: false,
  danger: false,
}
