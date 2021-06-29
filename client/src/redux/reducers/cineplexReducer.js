const initialState = {
  data: [],
  item: {},
};

const cineplexReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_CINEPLEXS_SUCCESS': {
      return {
        ...state,
        data: payload,
      };
    }
    case 'GET_CINEPLEXS_FAIL': {
      return {
        ...state,
        data: [],
      };
    }
    case 'REMOVE_CINEPLEXS': {
      return {
        ...state,
        data: [],
        item: {},
      };
    }
    case 'GET_CINEPLEX_ITEM': {
      return {
        ...state,
        item: payload,
      };
    }
    case 'REMOVE_CINEPLEX_ITEM': {
      return {
        ...state,
        item: {},
      };
    }
    default:
      return state;
  }
};

export default cineplexReducer;
