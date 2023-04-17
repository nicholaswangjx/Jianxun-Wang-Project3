const jwt = require('jsonwebtoken')
const settings = require('./config')
const errHandler = require('./error')

const verify = (req, res, next) => {
  const token = req.cookies.access_token
  console.log('Access token :' + token)
  if (!token)
    return next(
      errHandler(401, 'You are not allowed to perform this operation.')
    )
  jwt.verify(token, settings.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, 'Token is invalid'))
    req.user = user
    next()
  })
}

module.exports = verify
