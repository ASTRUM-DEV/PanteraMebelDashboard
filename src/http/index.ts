import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { toastError } from '@/toast/toast';

console.log(process.env.NEXT_PUBLIC_API_KEY)
const $host: AxiosInstance = axios.create({
  baseURL: "http://16.171.134.7:8000", // Assuming your environment variable is NEXT_PUBLIC_API_KEY
});

export default $host;
