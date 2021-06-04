import toast from 'react-hot-toast';

const initialState = {
  movies: [],
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_MOVIE_SUCCESS': {
      return {
        ...state,
        movies: payload,
      };
    }
    case 'GET_MOVIE_FAIL': {
      return {
        ...state,
        movies: [],
      };
    }
    case 'CREATE_MOVIE_SUCCESS': {
      window.location.reload();
      return {
        ...state,
      };
    }
    case 'CREATE_MOVIE_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }
    case 'DELETE_MOVIE_SUCCESS': {
      const { movieId } = payload;
      return {
        ...state,
        movies: [...state.movies].filter((movie) => movie.id !== movieId),
      };
    }
    case 'DELETE_MOVIE_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default movieReducer;
