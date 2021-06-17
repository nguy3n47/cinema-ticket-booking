import axiosClient from './axiosClient';

const movieApi = {
  getByState: (params) => {
    const url = '/movies';
    return axiosClient.get(url, { params });
  },

  getAllShowtimes: () => {
    const url = '/movies/showtimes';
    return axiosClient.get(url);
  },
};

export default movieApi;
