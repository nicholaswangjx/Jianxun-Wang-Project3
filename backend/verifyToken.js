const jwt = require('jsonwebtoken')
const settings = require('./config')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, settings.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

module.exports = verifyToken
