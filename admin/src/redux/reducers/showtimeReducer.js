import toast from 'react-hot-toast';

const initialState = {
  showtimes: [],
};

const showtimeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_ALL_SHOWTIMES_SUCCESS': {
      return {
        ...state,
        showtimes: payload,
      };
    }
    case 'GET_ALL_SHOWTIMES_FAIL': {
      return {
        ...state,
        showtimes: [],
      };
    }

    case 'CREATE_SHOWTIME_SUCCESS': {
      toast.success('Successfully Add New Showtime');
      return {
        ...state,
      };
    }
    case 'CREATE_SHOWTIME_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'UPDATE_SHOWTIME_SUCCESS': {
      toast.success('Successfully Update Showtime');
      return {
        ...state,
      };
    }
    case 'UPDATE_SHOWTIME_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }

    case 'DELETE_SHOWTIME_SUCCESS': {
      toast.success('Successfully Delete Showtime');
      const { showtimeId } = payload;
      return {
        ...state,
        showtimes: [...state.showtimes].filter((showtime) => showtime.id !== showtimeId),
      };
    }
    case 'DELETE_SHOWTIME_FAIL': {
      toast.error('Error!');
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default showtimeReducer;
