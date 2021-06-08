import toast from 'react-hot-toast';

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

    case 'CREATE_MOVIE_SUCCESS': {
      toast.success('Successfully Add New Movie');
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

    case 'UPDATE_MOVIE_SUCCESS': {
      toast.success('Successfully Update Movie');
      return {
        ...state,
      };
    }
    case 'UPDATE_MOVIE_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'DELETE_MOVIE_SUCCESS': {
      toast.success('Successfully Delete Movie');
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
