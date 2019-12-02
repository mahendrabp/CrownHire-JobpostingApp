const initialState = {
  user: {},
  token: null,
  loggedIn: false,
  isLoading: false,
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
        user: action.payload.data.user,
        token: action.payload.data.token,
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
