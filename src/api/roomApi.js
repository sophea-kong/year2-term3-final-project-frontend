import axiosClient from './axiosClient';

const roomApi = {
  getAllRooms: () => {
    return axiosClient.get('/rooms');
  },
  getAvailableRooms: () => {
    return axiosClient.get('/rooms/available');
  }
};

export default roomApi;
