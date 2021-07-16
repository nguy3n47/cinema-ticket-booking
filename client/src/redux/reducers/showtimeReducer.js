const initialState = {
  data: {},
  array: [],
  showtimes: [],
  message: '',
  movies: [],
};

const showtimeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SHOWTIME_DETAIL_SUCCESS': {
      return {
        ...state,
        data: payload,
      };
    }
    case 'GET_SHOWTIME_DETAIL_FAIL': {
      return {
        ...state,
        data: {},
      };
    }
    case 'REMOVE_SHOWTIME_DETAIL': {
      return {
        ...state,
        data: {},
      };
    }
    case 'GET_ALL_SHOWTIMES_BY_CINEPLEX_SUCCESS': {
      return {
        ...state,
        showtimes: payload,
        message: payload.length === 0 ? 'Không có lịch chiếu!' : '',
        movies: payload.length === 0 ? [] : payload[0].movies,
      };
    }
    case 'GET_ALL_SHOWTIMES_BY_CINEPLEX_FAIL': {
      return {
        ...state,
        showtimes: [],
      };
    }
    case 'RESET_MOVIES': {
      return {
        ...state,
        movies: [],
      };
    }
    case 'CHANGE_DAY_SHOWTIME': {
      return {
        ...state,
        movies: payload,
      };
    }
    case 'REMOVE_ALL_SHOWTIMES': {
      return {
        ...state,
        showtimes: [],
        movies: [],
        message: '',
      };
    }
    case 'GET_SEATS_SUCCESS': {
      return {
        ...state,
        array: payload,
      };
    }
    case 'GET_SEATS_FAIL': {
      return {
        ...state,
        array: [],
      };
    }
    case 'REMOVE_SEATS': {
      return {
        ...state,
        array: [],
      };
    }

    default:
      return state;
  }
};

export default showtimeReducer;
