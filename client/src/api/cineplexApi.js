import axiosClient from './axiosClient';

const cineplexApi = {
  getAll: () => {
    const url = '/cineplexs';
    return axiosClient.get(url);
  },
};

export default cineplexApi;
