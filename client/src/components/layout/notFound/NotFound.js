import React from 'react'
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
        <i className="fas fa-exclamation-triangle" /> Página no encontrada
      </h1>
      <p className="not-found__text">Lo sentimos, esta página no existe</p>
    </div>
  )
}

export default NotFound
