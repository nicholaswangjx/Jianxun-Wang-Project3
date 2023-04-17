const errHandler = require('../error')
const User = require('../models/User')
const TwitterPost = require('../models/TwitterPost')

const createPost = async (req, res) => {
  const newPost = new TwitterPost(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    errHandler(500, err)
  }
}

const deletePost = async (req, res) => {
  try {
    const twitterPost = await TwitterPost.findById(req.params.id)
    if (twitterPost.userId === req.body.id) {
      await twitterPost.deleteOne()
      res.status(200).json('delete successful')
    } else {
      res.status(403).json('You do not have permission to delete this post')
    }
  } catch (err) {
    errHandler(500, err)
  }
}

const updatePost = async (req, res) => {
  try {
    const twitterPost = await TwitterPost.findById(req.params.id)
    if (twitterPost.userId.toString() === req.body.userId) {
      await twitterPost.updateOne({ $set: { content: req.body.content } })
      res.status(200).json('update successful')
    } else {
      res.status(403).json('You do not have permission to update this post')
    }
  } catch (err) {
    errHandler(500, err)
  }
}

const likePost = async (req, res) => {
  try {
    const twitterPost = await TwitterPost.findById(req.params.id)
    if (!twitterPost.likes.includes(req.body.id)) {
      await twitterPost.updateOne({ $push: { likes: req.body.id } })
      res.status(200).json('liked')
    } else {
      await twitterPost.updateOne({ $pull: { likes: req.body.id } })
      res.status(200).json('unliked')
    }
  } catch (err) {
    errHandler(500, err)
  }
}

const getAllPost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id)
    const userPost = await TwitterPost.find({ userId: currentUser._id })
    const followersPost = await Promise.all(
      currentUser.following.map((id) => {
        return TwitterPost.find({ userId: id })
      })
    )

    const allPosts = userPost.concat(...followersPost)

    allPosts.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

    res.status(200).json(allPosts)
  } catch (err) {
    errHandler(500, err)
  }
}

const getUserAllPost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id)
    const userPost = await TwitterPost.find({ userId: currentUser._id }).sort({
      updatedAt: -1,
    })

    res.status(200).json(userPost)
  } catch (err) {
    errHandler(500, err)
  }
}

const getExplorePost = async (req, res) => {
  try {
    const explorePost = await TwitterPost.find().sort({
      updatedAt: -1,
    })
    res.status(200).json(explorePost)
  } catch (err) {
    errHandler(500, err)
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getAllPost,
  getUserAllPost,
  getExplorePost,
}
