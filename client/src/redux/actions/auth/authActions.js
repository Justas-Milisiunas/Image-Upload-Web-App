import imagesUploadApi from '../../../apis/imageUploadApi';
import {
  SUCCESSFUL_SIGN_IN,
  FAILED_SIGN_IN,
  SUCCESSFUL_SIGN_UP,
  FAILED_SIGN_UP,
  SUCCESSFUL_LOGOUT,
  FAILED_LOGOUT,
} from './authTypes';

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await imagesUploadApi.post('/auth/login', {
      email,
      password,
    });

    dispatch({ type: SUCCESSFUL_SIGN_IN, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_SIGN_IN,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    const response = await imagesUploadApi.post('/users', {
      email,
      password,
    });

    dispatch({ type: SUCCESSFUL_SIGN_UP, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_SIGN_UP,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await imagesUploadApi.get('/auth/signOut');
    dispatch({ type: SUCCESSFUL_LOGOUT });
  } catch (e) {
    dispatch({
      type: FAILED_LOGOUT,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};
