import axiosClient from './axiosClient';

const cinemaApi = {
  getAll: () => {
    const url = '/cinemas/all';
    return axiosClient.get(url);
  },
};

export default cinemaApi;
