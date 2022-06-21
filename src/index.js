import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/scooter-sharing/api',
//   responseType: 'json'
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const errObject = JSON.parse(JSON.stringify(error));

//     const originalRequest = error.config;

//     //check for refresh token time
//     // if(originalRequest.url === refreshTokenEndPoint){
//     //   logout();
//     //   window.location.href = '/';
//     // }

//     if(errObject.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       return await refreshTokens().then(
//         () => {
//           originalRequest.headers.Authorization = access_token;
//           return axios(originalRequest);
//         }
//       );
//     }
//     return Promise.reject(error);
//   }
// );

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);