import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mvn-task-manager.work',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    let token = window.localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    throw new Error(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw new Error(error);
  }
);

export default instance;
