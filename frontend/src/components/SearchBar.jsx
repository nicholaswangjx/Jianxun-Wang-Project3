import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search/${searchQuery}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full mx-auto mt-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-blue-100 rounded-full py-2 px-8 w-full"
        placeholder="Search for users..."
      />
    </form>
  )
}

export default SearchBar
