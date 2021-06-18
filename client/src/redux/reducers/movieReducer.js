const initialState = {
  list: [],
  movies: [],
  data: {},
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_ALL_MOVIES_SUCCESS': {
      return {
        ...state,
        list: payload,
      };
    }
    case 'GET_ALL_MOVIES_FAIL': {
      return {
        ...state,
        list: [],
      };
    }

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
    default:
      return state;
  }
};

export default movieReducer;
