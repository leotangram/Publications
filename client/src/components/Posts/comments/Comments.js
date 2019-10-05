import React from 'react'
import PropTypes from 'prop-types'
import './Comments.scss'

// Components
import Comment from '../comment/Comment'
import CommentForm from '../commentForm/CommentForm'

const Comments = ({ post }) => {
  console.log(post)

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

Comments.propTypes = {}

export default Comments
