const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errHandler = require('../error')
const settings = require('../config')

const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, settings.JWT_SECRET)

    // extract password from the user profile
    const { password, ...otherData } = newUser._doc
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(otherData)
  } catch (err) {
    next(err)
  }
}

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user) return next(errHandler(404, 'User not found.'))

    const pwdCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!pwdCorrect) return next(errHandler(400, 'Password is not correct.'))

    const token = jwt.sign({ id: user._id }, settings.JWT_SECRET)
    const { password, ...otherData } = user._doc

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(otherData)
  } catch (err) {
    next(err)
  }
}

module.exports = { signup, signin }
