import axiosClient from './axiosClient';

const movieApi = {
  getAll: () => {
    const url = '/movies';
    return axiosClient.get(url);
  },

  getByState: (params) => {
    const url = '/movies';
    return axiosClient.get(url, { params });
  },

  getBySlug: (slug) => {
    const url = `/movies/detail/${slug}`;
    return axiosClient.get(url);
  },

  getAllShowtimes: () => {
    const url = '/movies/showtimes';
    return axiosClient.get(url);
  },
};

export default movieApi;
