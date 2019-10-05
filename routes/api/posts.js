const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const user = await User.findById(req.user.id).select('-password')
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })
      const post = await newPost.save()
      res.json(post)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(500).send('Server error')
  }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' })
    }
    await post.remove()
    res.json({ message: 'Post removed' })
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ message: 'Post already liked' })
    }
    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/blue/:id
// @desc    Blue a post
// @access  Private
router.put('/blue/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been blued
    if (
      post.blues.filter(blue => blue.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ message: 'Post already blued' })
    }
    post.blues.unshift({ user: req.user.id })
    await post.save()
    res.json(post.blues)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/red/:id
// @desc    Red a post
// @access  Private
router.put('/red/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been reded
    if (
      post.reds.filter(red => red.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ message: 'Post already reded' })
    }
    post.reds.unshift({ user: req.user.id })
    await post.save()
    res.json(post.reds)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/yellow/:id
// @desc    Yellow a post
// @access  Private
router.put('/yellow/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been yellowed
    if (
      post.yellows.filter(yellow => yellow.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ message: 'Post already yellowed' })
    }
    post.yellows.unshift({ user: req.user.id })
    await post.save()
    res.json(post.yellows)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ message: 'Post has not yet been liked' })
    }
    // Get removed index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)

    await post.save()
    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/unblue/:id
// @desc    Blue a post
// @access  Private
router.put('/unblue/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been blued
    if (
      post.blues.filter(blue => blue.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ message: 'Post has not yet been blued' })
    }
    // Get removed index
    const removeIndex = post.blues
      .map(blue => blue.user.toString())
      .indexOf(req.user.id)

    post.blues.splice(removeIndex, 1)

    await post.save()
    res.json(post.blues)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/unred/:id
// @desc    Red a post
// @access  Private
router.put('/unred/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been reded
    if (
      post.reds.filter(red => red.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({ message: 'Post has not yet been reded' })
    }
    // Get removed index
    const removeIndex = post.reds
      .map(red => red.user.toString())
      .indexOf(req.user.id)

    post.reds.splice(removeIndex, 1)

    await post.save()
    res.json(post.reds)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/unyellow/:id
// @desc    Yellow a post
// @access  Private
router.put('/unyellow/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been yellowed
    if (
      post.yellows.filter(yellow => yellow.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ message: 'Post has not yet been yellowed' })
    }
    // Get removed index
    const removeIndex = post.yellows
      .map(yellow => yellow.user.toString())
      .indexOf(req.user.id)

    post.yellows.splice(removeIndex, 1)

    await post.save()
    res.json(post.yellows)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }
      post.comments.unshift(newComment)
      await post.save()
      res.json(post.comments)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist' })
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' })
    }

    // Get removed index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id)

    post.comments.splice(removeIndex, 1)

    await post.save()

    res.json(post.comments)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
