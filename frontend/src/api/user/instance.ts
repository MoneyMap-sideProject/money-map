import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`,
  withCredentials: true,
});

export default instance;
