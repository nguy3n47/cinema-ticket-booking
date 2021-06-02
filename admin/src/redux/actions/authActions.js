export const setAccessToken = (token) => ({
  type: 'ACCESS_TOKEN',
  payload: token,
});

export const getUserInfo = (payload) => ({
  type: 'GET_USER_INFO',
  payload,
});

export const logout = () => ({
  type: 'LOGOUT',
});
