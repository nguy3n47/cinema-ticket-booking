import axiosClient from './axiosClient';

const bookingApi = {
  create: (data, token) => {
    const url = `/bookings`;
    return axiosClient.post(url, data, { headers: { Authorization: 'Bearer ' + token } });
  },
};

export default bookingApi;
