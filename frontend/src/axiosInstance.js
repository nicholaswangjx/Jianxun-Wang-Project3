import axios from 'axios'
import settings from './config'

const axiosInstance = axios.create({
  baseURL: settings.BASE_URL,
  withCredentials: true,
})

export default axiosInstance
