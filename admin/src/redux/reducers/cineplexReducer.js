import toast from 'react-hot-toast';

const initialState = {
  cineplexs: [],
};

const cineplexReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_CINEPLEX_SUCCESS': {
      return {
        ...state,
        cineplexs: payload,
      };
    }
    case 'GET_CINEPLEX_FAIL': {
      return {
        ...state,
        cineplexs: [],
      };
    }

    case 'CREATE_CINEPLEX_SUCCESS': {
      toast.success('Successfully Add New Cineplex');
      return {
        ...state,
      };
    }
    case 'CREATE_CINEPLEX_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'UPDATE_CINEPLEX_SUCCESS': {
      toast.success('Successfully Update Cineplex');
      return {
        ...state,
      };
    }
    case 'UPDATE_CINEPLEX_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'DELETE_CINEPLEX_SUCCESS': {
      toast.success('Successfully Delete Cineplex');
      const { cineplexId } = payload;
      return {
        ...state,
        cineplexs: [...state.cineplexs].filter((cineplex) => cineplex.id !== cineplexId),
      };
    }
    case 'DELETE_CINEPLEX_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default cineplexReducer;
