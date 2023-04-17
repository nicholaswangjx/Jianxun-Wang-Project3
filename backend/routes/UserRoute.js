const express = require('express')
const verifyToken = require('../verifyToken')
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  searchUsers,
} = require('../controllers/UserController')

const router = express.Router()

// get user
router.get('/find/:id', getUser)

// update user
router.put('/:id', verifyToken, updateUser)

// delete user
router.delete('/:id', verifyToken, deleteUser)

// follow a user
router.put('/follow/:id', verifyToken, followUser)

// stop follow a user
router.put('/unfollow/:id', verifyToken, unFollowUser)

router.get('/search/:query', searchUsers)

module.exports = router
