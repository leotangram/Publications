import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

// Redux
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../../actions/post'

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  return (
    <div class="">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="">{text}</p>
        <p class="">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button onClick={e => addLike(_id)} type="button" class="">
              <i class="" />{' '}
              <span>{likes.length > 0 && <span>{comments.length}</span>}</span>
            </button>
            <button onClick={e => removeLike(_id)} type="button" class="">
              <i class="" />
            </button>
            <Link to={`/posts/${_id}`} class="">
              Discussion{' '}
              {comments.length > 0 && <span class="">{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button type="button" class="" onClick={e => deletePost(_id)}>
                <i class="" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true
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
