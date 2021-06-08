import showtimeApi from '../../api/showtimeApi';

export const getAllShowtimesByMovieId = (data) => async (dispatch) => {
  try {
    const response = await showtimeApi.getShowtimesByMovieId(data);
    dispatch({
      type: 'GET_ALL_SHOWTIMES_SUCCESS',
      payload: response.showtimes,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_SHOWTIMES_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShowtime = (data) => async (dispatch) => {
  try {
    await showtimeApi.create(data);
    dispatch({
      type: 'CREATE_SHOWTIME_SUCCESS',
    });

    const response = await showtimeApi.getShowtimesByMovieId({ movie_id: data.movie_id });
    dispatch({
      type: 'GET_ALL_SHOWTIMES_SUCCESS',
      payload: response.showtimes,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_SHOWTIME_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateShowtime = (data, id) => async (dispatch) => {
  try {
    await showtimeApi.update(data, id);
    dispatch({
      type: 'UPDATE_SHOWTIME_SUCCESS',
    });

    const response = await showtimeApi.getShowtimesByMovieId({ movie_id: data.movie_id });
    dispatch({
      type: 'GET_ALL_SHOWTIMES_SUCCESS',
      payload: response.showtimes,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_SHOWTIME_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeShowtime = (id) => async (dispatch) => {
  try {
    await showtimeApi.delete(id);
    dispatch({
      type: 'DELETE_SHOWTIME_SUCCESS',
      payload: { showtimeId: id },
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_SHOWTIME_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
