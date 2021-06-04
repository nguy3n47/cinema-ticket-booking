import movieApi from '../../api/movieApi';

export const getAllMovies = (data) => async (dispatch) => {
  try {
    const response = await movieApi.getAll();
    dispatch({
      type: 'GET_MOVIE_SUCCESS',
      payload: response.movies,
    });
  } catch (error) {
    dispatch({
      type: 'GET_MOVIE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
