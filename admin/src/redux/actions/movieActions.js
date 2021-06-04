import movieApi from '../../api/movieApi';

export const getAllMovies = () => async (dispatch) => {
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

export const createMovie = (data) => async (dispatch) => {
  try {
    await movieApi.create(data);
    dispatch({
      type: 'CREATE_MOVIE_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_MOVIE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeMovie = (id) => async (dispatch) => {
  try {
    await movieApi.delete(id);
    dispatch({
      type: 'DELETE_MOVIE_SUCCESS',
      payload: { movieId: id },
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_MOVIE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
