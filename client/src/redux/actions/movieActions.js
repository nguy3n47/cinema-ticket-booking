import movieApi from '../../api/movieApi';

export const getAllMoviesByState = (state) => async (dispatch) => {
  try {
    const response = await movieApi.getByState(state);
    dispatch({
      type: 'GET_MOVIES_SUCCESS',
      payload: response.movies,
    });
  } catch (error) {
    dispatch({
      type: 'GET_MOVIES_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
