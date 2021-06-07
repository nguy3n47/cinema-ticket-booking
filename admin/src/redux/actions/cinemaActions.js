import cinemaApi from '../../api/cinemaApi';

export const getAllCinemas = () => async (dispatch) => {
  try {
    const response = await cinemaApi.getAll();
    dispatch({
      type: 'GET_CINEMAS_SUCCESS',
      payload: response.cinemas,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CINEMAS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
