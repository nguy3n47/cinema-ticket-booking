import axiosClient from './axiosClient';

const showtimeApi = {
  getShowtimesByMovieId: (params) => {
    const url = '/showtimes';
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = '/showtimes';
    return axiosClient.post(url, data);
  },

  update: (data, id) => {
    const url = `/showtimes/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/showtimes/${id}`;
    return axiosClient.delete(url);
  },
};

export default showtimeApi;
