import movieApi from '../../api/movieApi';

export const getAllMoviesByStateAction = (state) => async (dispatch) => {
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

export const getMovieBySlugAction = (slug, history) => async (dispatch) => {
  try {
    const response = await movieApi.getBySlug(slug);
    if (!response.error) {
      dispatch({
        type: 'GET_MOVIE_DETAIL_SUCCESS',
        payload: response,
      });
    } else {
      dispatch({
        type: 'GET_MOVIE_DETAIL_FAIL',
        payload: response.error,
      });
      history.push('/movies/now-showing');
    }
  } catch (error) {
    dispatch({
      type: 'GET_MOVIE_DETAIL_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getMovieShowtimesAction = (id, day) => async (dispatch) => {
  try {
    const response = await movieApi.getShowtimes(id, day);
    dispatch({
      type: 'GET_MOVIE_SHOWTIMES_SUCCESS',
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: 'GET_MOVIE_SHOWTIMES_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
