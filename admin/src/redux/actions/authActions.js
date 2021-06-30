import authApi from '../../api/authApi';

export const setAccessToken = (token) => ({
  type: 'ACCESS_TOKEN',
  payload: token,
});

export const login = (data, history) => async (dispatch) => {
  try {
    const response = await authApi.login(data);
    if (response.admin) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.admin,
      });
      history.push('/');
    } else {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
