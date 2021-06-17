const initialState = {
  movies: [],
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
    default:
      return state;
  }
};

export default movieReducer;
