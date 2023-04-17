import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import Post from './Post'
import settings from '../config'
import axiosInstance from '../axiosInstance'

const Timeline = () => {
  const [timeLine, setTimeLine] = useState(null)

  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axiosInstance.get(
          settings.BASE_URL + `/twitterPost/all-posts/${currentUser._id}`
        )

        setTimeLine(timelineTweets.data)
      } catch (err) {
        console.log('error', err)
      }
    }

    fetchData()
  }, [currentUser._id])

  return (
    <div className="mt-6">
      {timeLine &&
        timeLine.map((post) => {
          return (
            <div key={post._id} className="p-2">
              <Post post={post} setData={setTimeLine} />
            </div>
          )
        })}
    </div>
  )
}

export default Timeline
