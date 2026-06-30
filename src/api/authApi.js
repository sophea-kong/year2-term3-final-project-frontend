import axiosClient from './axiosClient';

const authApi = {
  register: (userData) => {
    return axiosClient.post('/auth/register', userData);
  },
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },
  me : () =>{
    return axiosClient.get('/auth/me');
  }
};

export default authApi;