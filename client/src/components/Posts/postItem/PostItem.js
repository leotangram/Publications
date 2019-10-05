import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/es'
import './PostItem.scss'

// Redux
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../../actions/post'

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, date }
}) => {
  return (
    <div className="post__container">
      <div className="post">
        <img className="post__avatar" src={avatar} alt="" />
        <div className="post__content">
          <h3 className="post__name">{name}</h3>
          <small className="post__date">
            <Moment fromNow globallocale={'es'}>
              {date}
            </Moment>
          </small>
          <p className="post__capitalize">{text}</p>
          <button
            onClick={e => addLike(_id)}
            type="button"
            className="post__content--button"
          >
            <i className="fas fa-thumbs-up post__content--button-like" />{' '}
            <span>
              {likes && likes.length > 0 && <span>{likes.length}</span>}
            </span>
          </button>
          <button
            onClick={e => removeLike(_id)}
            type="button"
            className="post__content--button"
          >
            <i className="fas fa-thumbs-down post__content--button-dislike" />
          </button>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="post__content--button"
              onClick={e => deletePost(_id)}
            >
              <i className="fas fa-times post__content--button-remove" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem)
