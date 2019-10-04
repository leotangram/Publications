import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PostForm.scss'

// Redux
import { connect } from 'react-redux'
import { addPost } from '../../../actions/post'

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('')

  return (
    <form
      class="post-form"
      onSubmit={e => {
        e.preventDefault()
        addPost({ text })
        setText('')
      }}
    >
      <input
        className="post-form__form--input"
        name="text"
        placeholder="Escribe aquí tu estado"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <div className="post-form__form--submit-container">
        <input type="submit" class="post-form__form--submit" value="Submit" />
      </div>
    </form>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(
  null,
  { addPost }
)(PostForm)
