import axios, { AxiosInstance } from 'axios'

const $host: AxiosInstance = axios.create({
  baseURL: 'https://api.panteramebel.uz/ru' // Assuming your environment variable is NEXT_PUBLIC_API_KEY
})

export default $host
