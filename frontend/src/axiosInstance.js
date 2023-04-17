import axios from 'axios'
import settings from './config'
import { store } from './redux/store'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.user.currentUser?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
