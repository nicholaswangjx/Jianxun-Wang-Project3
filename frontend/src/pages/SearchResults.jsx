import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import settings from '../config'

const SearchResults = () => {
  const { query } = useParams()
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(
          `${settings.BASE_URL}/users/search/${query}`
        )
        setResults(response.data)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchResults()
  }, [query])

  return (
    <div className="container mx-auto my-5">
      <h1 className="mb-4">Search results for: {query}</h1>
      {results.map((user) => (
        <div key={user._id} className="mb-4">
          <a
            href={`/profile/${user._id}`}
            className="text-blue-500 hover:underline"
          >
            {user.username}
          </a>
        </div>
      ))}
    </div>
  )
}

export default SearchResults
