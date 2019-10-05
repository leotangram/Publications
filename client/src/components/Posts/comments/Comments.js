import React from 'react'
import PropTypes from 'prop-types'
import './Comments.scss'

// Components
import Comment from '../comment/Comment'
import CommentForm from '../commentForm/CommentForm'

const Comments = ({ post }) => {
  return (
    <section className="comments__container">
      <div className="comments">
        {post.comments &&
          post.comments.map(comment => (
            <Comment key={comment._id} comment={comment} postId={post._id} />
          ))}
        <CommentForm postId={post._id} />
      </div>
    </section>
  )
}

Comments.propTypes = {
  post: PropTypes.object.isRequired
}

export default Comments
