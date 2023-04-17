import React, { useState } from 'react'
import formatDistance from 'date-fns/formatDistance'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axiosInstance from '../axiosInstance'

import settings from '../config'

const Post = ({ post, setData }) => {
  const [userData, setUserData] = useState()

  const { currentUser } = useSelector((state) => state.user)

  const dateStr = formatDistance(new Date(post.createdAt), new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axiosInstance.get(
          settings.BASE_URL + `/users/find/${post.userId}`
        )

        setUserData(findUser.data)
      } catch (err) {
        console.log('error', err)
      }
    }

    fetchData()
  }, [post.userId])

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(settings.BASE_URL + `/twitterPost/${postId}`, {
        data: { id: currentUser._id },
      })
      setData((prevData) => prevData.filter((p) => p._id !== postId))
    } catch (err) {
      console.log('error', err)
    }
  }

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')

  const handleEdit = (postId) => {
    setIsEditing(true)
    setEditedContent(post.content)
  }

  const handleSaveEdit = async (postId) => {
    try {
      await axiosInstance.put(
        settings.BASE_URL + `/twitterPost/${postId}/update`,
        {
          content: editedContent,
          userId: currentUser._id,
        }
      )
      setData((prevData) =>
        prevData.map((p) =>
          p._id === postId ? { ...p, content: editedContent } : p
        )
      )
      setIsEditing(false)
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <div>
      {userData && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to={`/profile/${userData._id}`}>
                <h3 className="font-bold">{userData.username}</h3>
              </Link>
              <span className="font-normal">@{userData.username}</span>
              <p> - {dateStr}</p>
            </div>
            {currentUser && userData._id === currentUser._id && (
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-6 rounded-full"
                  onClick={() => handleEdit(post._id)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full"
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-full mt-2"
                onClick={() => handleSaveEdit(post._id)}
              >
                Save
              </button>
            </div>
          ) : (
            <p>{post.content}</p>
          )}
        </>
      )}
    </div>
  )
}

export default Post
