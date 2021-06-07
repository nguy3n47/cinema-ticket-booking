import toast from 'react-hot-toast';

const initialState = {
  cinemas: [],
};

const cinemaReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_CINEMAS_SUCCESS': {
      return {
        ...state,
        cinemas: payload,
      };
    }
    case 'GET_CINEMAS_FAIL': {
      return {
        ...state,
        cinemas: [],
      };
    }

    default:
      return state;
  }
};

export default cinemaReducer;
