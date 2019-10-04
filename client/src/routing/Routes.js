import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Login from '../components/auth/login/Login'
import Register from '../components/auth/register/Register'
import Alert from '../components/layout/alert/Alert'
import PrivateRoute from './PrivateRoute'
import Posts from '../components/Posts/Posts'

const Routes = props => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/posts" component={Posts} />
      </Switch>
    </section>
  )
}

Routes.propTypes = {}

export default Routes
