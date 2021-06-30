import authApi from '../../api/authApi';

export const setAccessToken = (token) => ({
  type: 'ACCESS_TOKEN',
  payload: token,
});

export const loginAction = (data) => async (dispatch) => {
  try {
    const response = await authApi.login(data);
    if (response.user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response,
      });
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
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProfileAction = (data) => async (dispatch, getState) => {
  try {
    let { accessToken } = getState().auth;
    await authApi.updateInfo(data, accessToken);
    const response = await authApi.getInfo(accessToken);
    if (!response.error) {
      dispatch({
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: response,
      });
    } else {
      dispatch({
        type: 'UPDATE_PROFILE_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_PROFILE_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const registerAction = (data) => async (dispatch) => {
  try {
    const response = await authApi.register(data);
    if (!response.error) {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: data.email,
      });
    } else {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const verifyEmailAction = (data) => async (dispatch) => {
  try {
    const response = await authApi.verifyEmail(data);
    if (!response.error) {
      dispatch({
        type: 'VERIFY_EMAIL_SUCCESS',
        payload: true,
      });
    } else {
      dispatch({
        type: 'VERIFY_EMAIL_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'VERIFY_EMAIL_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const forgotPasswordAction = (data) => async (dispatch) => {
  try {
    const response = await authApi.forgotPassword(data);
    if (!response.error) {
      dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: data.email,
      });
    } else {
      dispatch({
        type: 'FORGOT_PASSWORD_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'FORGOT_PASSWORD_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const verifyCodeResetPasswordAction = (data) => async (dispatch) => {
  try {
    const response = await authApi.verifyCodeResetPassword(data);
    if (!response.error) {
      dispatch({
        type: 'VERIFY_CODE_RESET_PASSWORD_SUCCESS',
        payload: true,
      });
    } else {
      dispatch({
        type: 'VERIFY_CODE_RESET_PASSWORD_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'VERIFY_CODE_RESET_PASSWORD_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const resetPasswordAction = (data) => async (dispatch) => {
  try {
    const response = await authApi.resetPassword(data);
    if (!response.error) {
      dispatch({
        type: 'RESET_PASSWORD_SUCCESS',
        payload: true,
      });
    } else {
      dispatch({
        type: 'RESET_PASSWORD_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'VERIFY_CODE_RESET_PASSWORD_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
