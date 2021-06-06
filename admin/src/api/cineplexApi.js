import axiosClient from './axiosClient';

const cineplexApi = {
  getAll: () => {
    const url = '/cineplexs';
    return axiosClient.get(url);
  },

  create: (formData) => {
    const url = '/cineplexs';
    return axiosClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update: (formData, id) => {
    const url = `/cineplexs/${id}`;
    return axiosClient.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: (id) => {
    const url = `/cineplexs/${id}`;
    return axiosClient.delete(url);
  },
};

export default cineplexApi;
