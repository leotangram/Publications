import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Componentes
import Routes from './routing/Routes'
import Navbar from './components/layout/navbar/Navbar'

function App() {
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
