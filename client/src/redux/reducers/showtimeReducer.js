const initialState = {
  data: {},
  array: [],
};

const showtimeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SHOWTIME_DETAIL_SUCCESS': {
      return {
        ...state,
        data: payload,
      };
    }
    case 'GET_SHOWTIME_DETAIL_FAIL': {
      return {
        ...state,
        data: {},
      };
    }
    case 'REMOVE_SHOWTIME_DETAIL': {
      return {
        ...state,
        data: {},
      };
    }
    case 'GET_SEATS_SUCCESS': {
      return {
        ...state,
        array: payload,
      };
    }
    case 'GET_SEATS_FAIL': {
      return {
        ...state,
        array: [],
      };
    }
    case 'REMOVE_SEATS': {
      return {
        ...state,
        array: [],
      };
    }

    default:
      return state;
  }
};

export default showtimeReducer;
