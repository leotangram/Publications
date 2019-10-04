import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Routes.scss'

// Components
import Login from '../components/auth/login/Login'
import Register from '../components/auth/register/Register'

const Routes = props => {
  return (
    <section className="routes">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </section>
  )
}

Routes.propTypes = {}

export default Routes
