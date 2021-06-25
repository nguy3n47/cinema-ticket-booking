import showtimeApi from '../../api/showtimeApi';

export const getShowtimeDetailAction = (id, history) => async (dispatch) => {
  try {
    const response = await showtimeApi.getById(id);
    if (!response.error) {
      dispatch({
        type: 'GET_SHOWTIME_DETAIL_SUCCESS',
        payload: response,
      });
    } else {
      history.push('/movies/now-showing');
    }
  } catch (error) {
    dispatch({
      type: 'GET_SHOWTIME_DETAIL_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getShowtimeSeatsAction = (id) => async (dispatch) => {
  try {
    const response = await showtimeApi.getSeats(id);
    if (!response.error) {
      dispatch({
        type: 'GET_SEATS_SUCCESS',
        payload: response.seats,
      });
    }
  } catch (error) {
    dispatch({
      type: 'GET_SEATS_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
