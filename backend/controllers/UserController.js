const errHandler = require('../error')
const User = require('../models/User')
const TwitterPost = require('../models/TwitterPost')

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    errHandler(500, err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      )
      res.status(200).json(updatedUser)
    } else {
      return next(errHandler(403, 'Update account invalid'))
    }
  } catch (err) {
    errHandler(500, err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      try {
        await User.findByIdAndDelete(req.params.id)
        await TwitterPost.deleteMany({ userId: req.params.id })
        res.status(200).json('User deleted')
      } catch (err) {
        next(err)
      }
    } else {
      return next(errHandler(403, 'Delete account invalid'))
    }
  } catch (err) {
    errHandler(500, err)
  }
}

const followUser = async (req, res) => {
  try {
    // try to follow user
    const user = await User.findById(req.params.id)
    // current user
    const currentUser = await User.findById(req.body.id)

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({ $push: { followers: req.body.id } })
      await currentUser.updateOne({ $push: { following: req.params.id } })
    } else {
      res.status(403).json('You already follow this user')
    }

    res.status(200).json('follow successful')
  } catch (err) {
    errHandler(500, err)
  }
}

const unFollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.id)

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({ $pull: { followers: req.body.id } })
      await currentUser.updateOne({ $pull: { following: req.params.id } })
    } else {
      res.status(403).json('You are not following this user')
    }

    res.status(200).json('unfollow successful')
  } catch (err) {
    errHandler(500, err)
  }
}

const searchUsers = async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.params.query, $options: 'i' },
    })
    res.status(200).json(users)
  } catch (err) {
    errHandler(500, err)
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  searchUsers,
}
