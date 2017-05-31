import React, { PropTypes } from 'react'

export function TextField(props) {
  const { label, meta, input, ...otherProps } = props
  const { dirty, error } = meta
  return (
    <div className="form-group">
      <label htmlFor="usr">{label}</label>
      <input type="text" className="form-control" id="usr" {...input} {...otherProps} />
      { dirty && error && <span>{error}</span> }
    </div>
  )
}

export function PasswordField(props) {
  const { label, meta, input, ...otherProps } = props
  const { dirty, error } = meta
  return (
    <div className="form-group">
      <label htmlFor="usr">{label}</label>
      <input type="password" className="form-control" id="usr" {...input} {...otherProps} />
      { dirty && error && <span>{error}</span> }
    </div>
  )
}
