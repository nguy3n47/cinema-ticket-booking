import axiosClient from './axiosClient';

const showtimeApi = {
  getById: (id) => {
    const url = `/showtimes/${id}`;
    return axiosClient.get(url);
  },

  getSeats: (id) => {
    const url = `/showtimes/${id}/seats`;
    return axiosClient.get(url);
  },
};

export default showtimeApi;
