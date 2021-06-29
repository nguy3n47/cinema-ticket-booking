const initialState = {
  movies: [],
  data: {},
  showtimes: [],
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_MOVIES_SUCCESS': {
      return {
        ...state,
        movies: payload,
      };
    }
    case 'GET_MOVIES_FAIL': {
      return {
        ...state,
        movies: [],
      };
    }
    case 'REMOVE_MOVIES': {
      return {
        ...state,
        movies: [],
      };
    }
    case 'GET_MOVIE_DETAIL_SUCCESS': {
      return {
        ...state,
        data: payload,
      };
    }
    case 'GET_MOVIE_DETAIL_FAIL': {
      return {
        ...state,
        data: {},
      };
    }
    case 'REMOVE_MOVIE_DETAIL': {
      return {
        ...state,
        data: {},
      };
    }
    case 'GET_MOVIE_SHOWTIMES_SUCCESS': {
      return {
        ...state,
        showtimes: payload,
      };
    }
    case 'GET_MOVIE_SHOWTIMES_FAIL': {
      return {
        ...state,
        showtimes: [],
      };
    }
    case 'REMOVE_MOVIE_SHOWTIMES': {
      return {
        ...state,
        showtimes: [],
      };
    }
    default:
      return state;
  }
};

export default movieReducer;
