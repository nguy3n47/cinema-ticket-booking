import toast from 'react-hot-toast';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  email: '',
  password: '',
  accessToken: '',
  isVerified: false,
  isVerifyCodeResetPassword: false,
  isReset: false,
  isLogined: false,
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

    case 'VERIFY_CODE_RESET_PASSWORD_SUCCESS': {
      return {
        ...state,
        isVerifyCodeResetPassword: payload,
      };
    }
    case 'VERIFY_CODE_RESET_PASSWORD_FAIL': {
      toast.error('Mã không hợp lệ!');
      return {
        ...state,
      };
    }

    case 'RESET_PASSWORD_SUCCESS': {
      return {
        ...state,
        isReset: payload,
      };
    }
    case 'RESET_PASSWORD_FAIL': {
      toast.error('Mật khẩu không hợp lệ!');
      return {
        ...state,
      };
    }

    case 'FORGOT_PASSWORD_SUCCESS': {
      return {
        ...state,
        email: payload,
      };
    }
    case 'FORGOT_PASSWORD_FAIL': {
      toast.error('Email không tồn tại!');
      return {
        ...state,
      };
    }

    case 'LOGIN_SUCCESS': {
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        isLogined: true,
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
        isLogined: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
