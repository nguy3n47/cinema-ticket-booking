import axiosClient from './axiosClient';

const showtimeApi = {
  getShowtimesByMovieId: (data) => {
    const url = '/showtimes';
    return axiosClient.get(url, data);
  },

  create: (data) => {},

  update: (data, id) => {},

  delete: (id) => {},
};

export default showtimeApi;
