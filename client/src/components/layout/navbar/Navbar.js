import React from 'react'
import PropTypes from 'prop-types'
import './Navbar.scss'

function Navbar(props) {
  return (
    <section className="navbar">
      <div className="navbar__right">
        <h2>Publications</h2>
      </div>
      <div className="navbar__left">
        <h4>Registro</h4>
        <h4>Iniciar sesión</h4>
      </div>
    </section>
  )
}

Navbar.propTypes = {}

export default Navbar
