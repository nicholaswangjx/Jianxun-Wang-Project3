import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../axiosInstance'
import { following } from '../redux/userSlice'
import Post from '../components/Post'

import settings from '../config'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [userTweets, setUserTweets] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [description, setDescription] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axiosInstance.get(
          settings.BASE_URL + `/twitterPost/user/all/${id}`
        )
        const userProfile = await axiosInstance.get(
          settings.BASE_URL + `/users/find/${id}`
        )

        setUserTweets(userTweets.data)
        setUserProfile(userProfile.data)
      } catch (err) {
        console.log('error', err)
      }
    }
    fetchData()
  }, [currentUser, id])

  useEffect(() => {
    if (userProfile) {
      setDescription(userProfile.description || '')
    }
  }, [userProfile])

  const handleUpdateDescription = async () => {
    try {
      await axiosInstance.put(settings.BASE_URL + `/users/${id}`, {
        description: updatedDescription,
      })
      setDescription(updatedDescription)
      setIsEditing(false)
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axiosInstance.put(
          settings.BASE_URL + `/users/follow/${id}`,
          {
            id: currentUser._id,
          }
        )
        dispatch(following(id))
      } catch (err) {
        console.log('error', err)
      }
    } else {
      try {
        const unfollow = await axiosInstance.put(
          settings.BASE_URL + `/users/unfollow/${id}`,
          {
            id: currentUser._id,
          }
        )

        dispatch(following(id))
      } catch (err) {
        console.log('error', err)
      }
    }
  }

  return (
    <>
      <div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">
                {userProfile && userProfile.username}
              </h1>
              <p className="text-sm">
                Joined{' '}
                {userProfile &&
                  new Date(userProfile.createdAt).toLocaleDateString()}
              </p>
              {isEditing ? (
                <input
                  type="text"
                  className="border border-gray-400 px-2 py-1 mt-2 rounded"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              ) : (
                <p className="mt-2">{description}</p>
              )}
            </div>
            {currentUser && currentUser._id === id ? (
              <>
                <button
                  className="px-4 py-2 bg-blue-500 rounded-full text-white"
                  onClick={() => {
                    setIsEditing(true)
                    setUpdatedDescription(description)
                  }}
                >
                  Edit Profile
                </button>
                {isEditing && (
                  <button
                    className="px-4 py-2 bg-green-500 rounded-full text-white ml-2"
                    onClick={handleUpdateDescription}
                  >
                    Update
                  </button>
                )}
              </>
            ) : currentUser && currentUser.following.includes(id) ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : currentUser ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            ) : null}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Post post={tweet} setData={setUserTweets} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
