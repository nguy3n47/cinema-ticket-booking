const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_INFO': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
