import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import settings from '../config'
import { useSelector } from 'react-redux'

const Explore = () => {
  const [explore, setExplore] = useState(null)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweets = await axios.get(
          settings.BASE_URL + '/twitterPost/explore'
        )
        setExplore(exploreTweets.data)
      } catch (err) {
        console.log('error', err)
      }
    }
    fetchData()
  }, [currentUser])
  return (
    <div className="mt-6">
      {explore &&
        explore.map((post) => {
          return (
            <div key={post._id} className="p-2">
              <Post post={post} setData={setExplore} />
            </div>
          )
        })}
    </div>
  )
}

export default Explore
