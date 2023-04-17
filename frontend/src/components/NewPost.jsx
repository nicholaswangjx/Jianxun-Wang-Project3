import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import settings from '../config'
import axiosInstance from '../axiosInstance'

const NewPost = () => {
  const [postText, setPostText] = useState('')

  const { currentUser } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitTweet = await axiosInstance.post(
        settings.BASE_URL + '/twitterPost',
        {
          userId: currentUser._id,
          content: postText,
        }
      )
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setPostText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={300}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Publish
        </button>
      </form>
    </div>
  )
}

export default NewPost
