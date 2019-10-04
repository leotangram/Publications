import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Login.scss'

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
    <section className="login">
      <h1 className="login__title login__text-green">Iniciar sesión</h1>
      <p className="login__text-green">Entra con tu cuenta!</p>

      <form className="login__form" onSubmit={e => onSubmit(e)}>
        <input
          className="login__form--input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />
        <input
          className="login__form--input"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          minLength="6"
          required
        />
        <input
          type="submit"
          className="login__form--submit"
          value="Inicia sesión"
        />
      </form>
      <p className="login__text-green">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="login__link">
          ¡Regístrate!
        </Link>
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
