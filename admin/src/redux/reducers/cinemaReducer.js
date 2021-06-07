import toast from 'react-hot-toast';

const initialState = {
  cinemas: [],
  types: [],
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

    case 'GET_CINEMAS_TYPES_SUCCESS': {
      return {
        ...state,
        types: payload,
      };
    }
    case 'GET_CINEMAS_TYPES_FAIL': {
      return {
        ...state,
        types: [],
      };
    }

    case 'CREATE_CINEMA_SUCCESS': {
      toast.success('Successfully Add New Cinema');
      return {
        ...state,
      };
    }
    case 'CREATE_CINEMA_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'UPDATE_CINEMA_SUCCESS': {
      toast.success('Successfully Update Cinema');
      return {
        ...state,
      };
    }
    case 'UPDATE_CINEMA_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'DELETE_CINEMA_SUCCESS': {
      toast.success('Successfully Delete Cinema');
      const { cinemaId } = payload;
      return {
        ...state,
        cinemas: [...state.cinemas].filter((cinema) => cinema.id !== cinemaId),
      };
    }
    case 'DELETE_CINEMA_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default cinemaReducer;
