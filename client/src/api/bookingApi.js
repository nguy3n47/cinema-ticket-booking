import axiosClient from './axiosClient';

const bookingApi = {
  getByUserId: (token) => {
    const url = `/bookings`;
    return axiosClient.get(url, { headers: { Authorization: 'Bearer ' + token } });
  },

  create: (data, token) => {
    const url = `/bookings`;
    return axiosClient.post(url, data, { headers: { Authorization: 'Bearer ' + token } });
  },
};

export default bookingApi;
