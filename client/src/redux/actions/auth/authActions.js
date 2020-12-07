import imagesUploadApi from '../../../apis/imageUploadApi';
import {
  SUCCESSFUL_SIGN_IN,
  FAILED_SIGN_IN,
  SUCCESSFUL_SIGN_UP,
  FAILED_SIGN_UP,
  SUCCESSFUL_LOGOUT,
  FAILED_LOGOUT,
  SUCCESSFUL_PROFILE_DELETE,
  FAILED_PROFILE_DELETE,
  SUCCESSFUL_PROFILE_UPDATE,
  FAILED_PROFILE_UPDATE,
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

export const deleteProfile = () => async (dispatch) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await imagesUploadApi.delete('/users');
    dispatch({ type: SUCCESSFUL_PROFILE_DELETE });
  } catch (e) {
    dispatch({
      type: FAILED_PROFILE_DELETE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const updateProfile = (updatedUserData) => async (dispatch) => {
  try {
    const response = await imagesUploadApi.put('/users', updatedUserData);
    dispatch({ type: SUCCESSFUL_PROFILE_UPDATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_PROFILE_UPDATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};
