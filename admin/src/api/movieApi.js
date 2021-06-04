import axiosClient from './axiosClient';

const movieApi = {
  getAll: () => {
    const url = '/movies';
    return axiosClient.get(url);
  },
};

export default movieApi;
