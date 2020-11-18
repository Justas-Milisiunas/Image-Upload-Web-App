import { SUCCESSFUL_SIGN_IN, FAILED_SIGN_IN } from '../actions/authTypes';

const INITIAL_STATE = {
  profile: null,
  isSignedIn: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESSFUL_SIGN_IN: {
      const { accessToken, refreshToken } = action.payload;

      return {
        ...state,
        isSignedIn: true,
        accessToken,
        refreshToken,
      };
    }
    case FAILED_SIGN_IN:
      return {
        ...state,
        isSignedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
