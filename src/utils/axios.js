/**
 * Axios - Promise based HTTP client.
 *
 * - https://github.com/axios/axios
 */
import axios from 'axios';

import { push } from 'react-router-redux';

import store from '../store';
import config from '../config';

const instance = axios.create({
  baseURI: config.baseURI,
  timeout: 1000 * 10,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Request Interceptor.
 *
 * Add Authorization header if it exists.
 *
 * This configuration applies for ALL requests.
 */
instance.interceptors.request.use(
  reqConfig => {
    const access_token = localStorage.getItem('access_token');
    const token_type = localStorage.getItem('token_type');

    if (!reqConfig.headers) {
      reqConfig.headers = {};
    }

    reqConfig.headers.Authorization = token_type && access_token ? `${token_type} ${access_token}` : ``;

    return reqConfig;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor.
 *
 * Catch basic errors like 401 and redirect to login.
 *
 * This configuration applies for ALL responses.
 */
instance.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error.
    if (typeof error === 'undefined') {
      // Request cancelled.
      // When backend server is not available at all.
    } else if (typeof error.response === 'undefined') {
      // When request is timeout.
    } else if (error.response.status === 401) {
      // Apply refresh token logic here instead of redirecting to login.
      localStorage.clear();
      sessionStorage.clear();
      store.dispatch(push('/login'));
    }

    return Promise.reject(error.response);
  }
);

export default instance;
