import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import './Comment.scss'

// Redux
import { connect } from 'react-redux'
import { deleteComment } from '../../../actions/post'

const Comment = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  const firstName = name.replace(/ .*/, '')
  return (
    <div className="comment">
      <img className="comment__avatar" src={avatar} alt="" />
      <div className="comment__content">
        <div>
          <h4 className="comment__name">{firstName}</h4>
          <small className="comment__date">
            <Moment fromNow globallocale={'es'}>
              {date}
            </Moment>
          </small>
        </div>
        <p className="comment__capitalize comment__text">{text}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={e => deleteComment(postId, _id)}
            type="button"
            className="comment__content--button"
          >
            <i className="fas fa-times comment__content--button-remove" />
          </button>
        )}
      </div>
    </div>
  )
}

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deleteComment }
)(Comment)
