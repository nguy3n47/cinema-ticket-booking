import axiosClient from './axiosClient';

const authApi = {
  login: (data) => {
    const url = '/admin/auth/login';
    return axiosClient.post(url, data);
  },

  getInfo: (token) => {
    const url = '/admin/profile';
    return axiosClient.get(url, { headers: { Authorization: 'Bearer ' + token } });
  },
};

export default authApi;
