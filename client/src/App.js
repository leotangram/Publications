import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

// Componentes
import Routes from './routing/Routes'
import Navbar from './components/layout/navbar/Navbar'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
