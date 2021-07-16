import axiosClient from './axiosClient';

const showtimeApi = {
  getById: (id) => {
    const url = `/showtimes/${id}`;
    return axiosClient.get(url);
  },

  getByCineplexId: (data) => {
    const url = `/showtimes/cineplexs`;
    return axiosClient.post(url, data);
  },

  getSeats: (id) => {
    const url = `/showtimes/${id}/seats`;
    return axiosClient.get(url);
  },
};

export default showtimeApi;
