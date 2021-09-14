import axios from 'axios';
import store from '../store';

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
    const { token } = store.state.user;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return error;
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return error;
  }
);

export default instance;
