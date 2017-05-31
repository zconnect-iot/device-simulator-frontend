import React, { PropTypes } from 'react'
import classnames from 'classnames'

// import styles from './styles.scss'
const styles = {}

export default function Button(props) {
  const { children, className, danger, ...otherProps } = props
  return (
    <button
      className={classnames(styles.button, { danger }, { disabled: props.disabled }, className)}
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
