import {
  SUCCESSFUL_SIGN_IN,
  FAILED_SIGN_IN,
  SUCCESSFUL_SIGN_UP,
  FAILED_SIGN_UP,
  SUCCESSFUL_LOGOUT,
  FAILED_LOGOUT,
} from '../actions/auth/authTypes';

export const INITIAL_STATE = {
  isSignedIn: false,
  error: null,
  data: null,
  message: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESSFUL_SIGN_IN: {
      const data = action.payload;

      return getStateAfterSuccessfulAuth(state, data, 'Sign In was successful');
    }
    case SUCCESSFUL_SIGN_UP: {
      const data = action.payload;

      return getStateAfterSuccessfulAuth(state, data, 'Sign Up was successful');
    }
    case SUCCESSFUL_LOGOUT: {
      return {
        ...state,
        isSignedIn: false,
        message: 'Logout was successful',
        error: null,
        data: null,
      };
    }
    case FAILED_SIGN_UP:
    case FAILED_SIGN_IN:
      return {
        ...state,
        isSignedIn: false,
        error: action.payload,
        message: null,
      };

    case FAILED_LOGOUT: {
      return {
        ...state,
        isSignedIn: false,
        message: null,
        error: action.payload,
        data: null,
      };
    }
    default:
      return state;
  }
};

function getStateAfterSuccessfulAuth(state, data, message) {
  return {
    ...state,
    isSignedIn: true,
    data,
    message,
    error: null,
  };
}
