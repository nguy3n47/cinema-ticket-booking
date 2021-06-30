import axiosClient from './axiosClient';

const authApi = {
  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },

  register: (data) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },

  verifyEmail: (data) => {
    const url = '/auth/verifyEmail';
    return axiosClient.post(url, data);
  },

  forgotPassword: (data) => {
    const url = '/auth/forgotPassword';
    return axiosClient.post(url, data);
  },

  verifyCodeResetPassword: (data) => {
    const url = '/auth/verifyCodeResetPassword';
    return axiosClient.post(url, data);
  },

  resetPassword: (data) => {
    const url = '/auth/resetPassword';
    return axiosClient.post(url, data);
  },

  changePassword: (data) => {
    const url = '/auth/changePassword';
    return axiosClient.post(url, data);
  },

  getInfo: (token) => {
    const url = '/user/profile';
    return axiosClient.get(url, { headers: { Authorization: 'Bearer ' + token } });
  },

  updateInfo: (formData, token) => {
    const url = '/user/profile';
    return axiosClient.put(url, formData, { headers: { Authorization: 'Bearer ' + token } });
  },
};

export default authApi;
