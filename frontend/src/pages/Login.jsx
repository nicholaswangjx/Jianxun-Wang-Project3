import React, { useState } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailed } from '../redux/userSlice'

import { useNavigate } from 'react-router-dom'
import settings from '../config'
import axiosInstance from '../axiosInstance'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await axiosInstance.post(settings.BASE_URL + '/auth/signin', {
        username,
        password,
      })
      dispatch(loginSuccess(res.data))
      navigate('/')
    } catch (err) {
      dispatch(loginFailed())
    }
  }

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>

      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />

      <button
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        onClick={handleLogin}
      >
        Sign in
      </button>
    </form>
  )
}

export default Login
