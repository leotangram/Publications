import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CommentForm.scss'

// Redux
import { connect } from 'react-redux'
import { addComment } from '../../../actions/post'

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('')

  return (
    <form
      className="comment-form"
      onSubmit={e => {
        e.preventDefault()
        addComment(postId, { text })
        setText('')
      }}
    >
      <input
        className="comment-form__form--input"
        name="text"
        placeholder="Escribe un comentario"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <div className="comment-form__form--submit-container">
        <input
          type="submit"
          className="comment-form__form--submit"
          value="Submit"
        />
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default connect(
  null,
  { addComment }
)(CommentForm)
