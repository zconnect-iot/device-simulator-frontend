import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import { TextField, PasswordField } from 'widgets/Form'

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form>

      <Field label="Email" name="username" component={TextField} />

      <Field label="Password" name="password" component={PasswordField} />

      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-lg btn-pill btn-success"
        disabled={pristine || submitting}
      >
        LOG IN
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
