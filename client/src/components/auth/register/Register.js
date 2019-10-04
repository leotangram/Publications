import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Register.scss'

// Redux
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert'
import { register } from '../../../actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Password do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  // Redirect if looged in
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />
  // }

  return (
    <section className="register">
      <h1 className="register__title register__text-green">Registro</h1>
      <p className="register__text-green">Crea tu cuenta</p>
      <form className="register__form" onSubmit={e => onSubmit(e)}>
        <input
          className="register__form--input"
          type="text"
          placeholder="Nombre"
          name="name"
          value={name}
          onChange={e => onChange(e)}
          required
        />
        <input
          className="register__form--input"
          type="email"
          placeholder="Email Gravatar"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />
        <small className="register__form--small-text">
          Este sitio usa Gravatar, entonces si quieres usar tu imagen debes usar
          un correo vinculado a Gravatar
        </small>
        <input
          className="register__form--input"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          minLength="6"
        />
        <input
          className="register__form--input"
          type="password"
          placeholder="Confirmar contraseña"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
          minLength="6"
        />
        <input
          type="submit"
          className="register__form--submit"
          value="Register"
        />
      </form>
      <p className="register__text-green">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="register__link">
          ¡Inicia sesión!
        </Link>
      </p>
    </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register)
