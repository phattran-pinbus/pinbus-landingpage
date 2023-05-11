import axios from 'axios'
const API_URL = process.env.API_URL

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
})
