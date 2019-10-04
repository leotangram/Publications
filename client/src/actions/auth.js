import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR } from './types'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const response = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}
