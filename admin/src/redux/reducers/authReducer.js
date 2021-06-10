import toast from 'react-hot-toast';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN_SUCCESS': {
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    }
    case 'LOGIN_FAIL': {
      toast.error('Account is invalid!');
      return {
        ...state,
      };
    }
    case 'LOGOUT': {
      localStorage.clear();
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
