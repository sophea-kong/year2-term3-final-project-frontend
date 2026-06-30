import axiosClient from './axiosClient';

const scheduleApi = {
  checkConflict: (roomId, startTime, endTime) => {
    return axiosClient.post('/schedules/check-conflict', { roomId, startTime, endTime });
  }
};

export default scheduleApi;
