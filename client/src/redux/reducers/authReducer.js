import toast from 'react-hot-toast';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  email: '',
  password: '',
  accessToken: '',
  isVerified: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        email: payload,
      };
    }
    case 'REGISTER_FAIL': {
      toast.error('Dữ liệu không hợp lệ!');
      return {
        ...state,
      };
    }

    case 'VERIFY_EMAIL_SUCCESS': {
      return {
        ...state,
        isVerified: payload,
      };
    }
    case 'VERIFY_EMAIL_FAIL': {
      toast.error('Mã không hợp lệ!');
      return {
        ...state,
      };
    }

    case 'LOGIN_SUCCESS': {
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    }
    case 'LOGIN_FAIL': {
      toast.error('Tài khoản không hợp lệ!');
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
