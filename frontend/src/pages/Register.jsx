import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailed } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import settings from '../config'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    try {
      const res = await axios.post(settings.BASE_URL + '/auth/signup', {
        username,
        email,
        password,
        description,
      })
      dispatch(loginSuccess(res.data))
      navigate('/')
    } catch (err) {
      dispatch(loginFailed())
    }
  }

  return (
    <>
      <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center">
          Don't have an account?
        </h2>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="text-xl py-2 rounded-full px-4"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          required
          className="text-xl py-2 rounded-full px-4"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="text-xl py-2 rounded-full px-4"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="description (optional)"
          className="text-xl py-2 rounded-full px-4"
        />
        <button
          onClick={handleSignup}
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </>
  )
}

export default Register
