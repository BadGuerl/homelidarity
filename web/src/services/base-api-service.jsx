import axios from 'axios';

export const currentUserStorageKey = 'current-user';

const http = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api'
})

http.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  const status = error?.response?.status;
  switch (status) {
    case 401:
      localStorage.removeItem(currentUserStorageKey);
      window.location.replace('/login')
      break;
    case 404:
      window.location.replace('/404')
      break;
    case 403:
      window.location.replace('/403')
      break;
    default:
      break;
  }
  return Promise.reject(error);
});

export default http;
