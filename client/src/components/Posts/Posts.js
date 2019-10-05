import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Posts.scss'

// Redux
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'

// Components
import Spinner from '../layout/spinner/Spinner'
import PostItem from './postItem/PostItem'
import PostForm from './postForm/PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return (
    <section className="posts">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="posts__title posts__text-green">¡Bienvenido!</h1>
          <PostForm />
          <div className="posts__post">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </section>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
