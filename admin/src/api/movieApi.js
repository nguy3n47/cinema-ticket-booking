import axiosClient from './axiosClient';

const movieApi = {
  getAll: () => {
    const url = '/movies';
    return axiosClient.get(url);
  },

  getAllShowtimes: () => {
    const url = '/movies/showtimes';
    return axiosClient.get(url);
  },

  create: (formData) => {
    const url = '/movies';
    return axiosClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update: (formData, id) => {
    const url = `/movies/${id}`;
    return axiosClient.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: (id) => {
    const url = `/movies/${id}`;
    return axiosClient.delete(url);
  },
};

export default movieApi;
