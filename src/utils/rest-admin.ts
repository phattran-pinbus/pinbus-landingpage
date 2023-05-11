import axios from 'axios'
const API_URL = process.env.API_URL
const isServer = !process.browser

const token = !isServer ? localStorage.getItem('token') : ''

export default axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }
})
