const initialState = {
  user: {},
  token: null,
  loggedIn: false,
  isLoading: false,
  message: '',
  status: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        token: action.payload.data.token,
        status: action.payload.data.status,
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
        status: action.payload.response.data.status,
      };
    default:
      return state;
  }
};

export default auth;
