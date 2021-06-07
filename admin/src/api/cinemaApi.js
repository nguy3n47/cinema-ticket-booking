import axiosClient from './axiosClient';

const cinemaApi = {
  getAll: () => {
    const url = '/cinemas/all';
    return axiosClient.get(url);
  },

  getTypes: () => {
    const url = '/cinemas/types';
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = '/cinemas';
    return axiosClient.post(url, data);
  },

  update: (data, id) => {
    const url = `/cinemas/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/cinemas/${id}`;
    return axiosClient.delete(url);
  },
};

export default cinemaApi;
