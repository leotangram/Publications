import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Navbar.scss'

// Redix
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <section className="navbar">
      <div className="navbar__right">
        <h2>Publications</h2>
      </div>
      {isAuthenticated && (
        <div className="navbar__left">
          <Link onClick={logout} to="/login" className="navbar__left--logout">
            Cerrar sesión
          </Link>
        </div>
      )}
    </section>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)
