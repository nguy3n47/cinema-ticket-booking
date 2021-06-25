import axiosClient from './axiosClient';

const bookingApi = {
  create: () => {
    const url = `/bookings`;
    return axiosClient.post(url);
  },
};

export default bookingApi;
