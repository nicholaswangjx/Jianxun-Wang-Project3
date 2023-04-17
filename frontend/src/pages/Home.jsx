import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import Timeline from '../components/Timeline'
import NewPost from '../components/NewPost'

const Home = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div>
      {currentUser && (
        <p className="text-3xl pl-2 my-2">{currentUser.username}</p>
      )}
      <NewPost />
      <Timeline />
    </div>
  )
}

export default Home
