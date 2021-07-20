// axios
import axios from 'axios'

const baseURL = ""

export default axios.create({
  baseURL: baseURL,
  // You can add your headers here
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }
})

