const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Tu nombre es requerido')
      .not()
      .isEmpty(),
    check('email', 'Por favor incluye un email válido').isEmail(),
    check(
      'password',
      'Por favor ingresa una contraseña con 6 o más caractéres'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      //See if user exists
      let user = await User.findOne({ email })
      if (user) {
        res.status(400).json({ errors: [{ message: 'El usuario ya existe' }] })
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        size: '200',
        rating: 'pg',
        default: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

      // Encrypt password
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      // Return jsonwebtoken: JWT
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
