import toast from 'react-hot-toast';

const initialState = {
  total: 0,
  seats: [],
};

const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_BOOKING': {
      return {
        ...state,
        total: payload.total,
        seats: payload.seats,
      };
    }
    case 'REMOVE_BOOKING': {
      return {
        ...state,
        total: 0,
        seats: [],
      };
    }
    case 'CREATE_BOOKING_SUCCESS': {
      return {
        ...state,
      };
    }
    case 'CREATE_BOOKING_FAIL': {
      toast.error(payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default bookingReducer;
