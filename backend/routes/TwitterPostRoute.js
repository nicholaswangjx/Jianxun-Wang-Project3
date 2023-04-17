const express = require('express')
const verifyToken = require('../verifyToken')
const {
  createPost,
  deletePost,
  likePost,
  getAllPost,
  getUserAllPost,
  getExplorePost,
  updatePost,
} = require('../controllers/TwitterPostController')
const router = express.Router()

router.post('/', verifyToken, createPost)

router.delete('/:id', verifyToken, deletePost)

router.put('/:id/update', verifyToken, updatePost)

router.put('/:id/like', verifyToken, likePost)

router.get('/all-posts/:id', getAllPost)

router.get('/user/all/:id', getUserAllPost)

router.get('/explore', getExplorePost)

module.exports = router
