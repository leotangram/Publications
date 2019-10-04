import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import { login } from '../../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }

  // Redirect if looged in
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />
  // }

  return (
    <section>
      <h1 className="large text-primary">Iniciar sesión</h1>
      <p className="lead">
        <i className="fas fa-user" /> Entra con tu cuenta!
      </p>

      <form className="" onSubmit={e => onSubmit(e)}>
        <div className="">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="" value="Login" />
      </form>
      <p className="">
        ¿No tienes una cuenta? <Link to="/register">¡Regístrate!</Link>
      </p>
    </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { login }
)(Login)
