import axiosClient from './axiosClient';

const chatApi = {
  assist: (message) => {
    return axiosClient.post('/chat/assist', { message });
  }
};

export default chatApi;
