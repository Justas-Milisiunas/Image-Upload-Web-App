import imagesUploadApi from '../../../apis/imageUploadApi';
import {
  SUCCESSFUL_IMAGES_FETCH,
  SUCCESSFUL_IMAGE_FETCH,
  FAILED_IMAGES_FETCH,
  FETCH_IMAGES,
  FETCH_IMAGE,
  LOADING_COMMENT_CREATE,
  SUCCESSFUL_COMMENT_CREATE,
  FAILED_COMMENT_CREATE,
  SUCCESSFUL_COMMENT_DELETE,
  FAILED_COMMENT_DELETE,
  SUCCESSFUL_COMMENT_UPDATE,
  FAILED_COMMENT_UPDATE,
  SUCCESSFUL_RATING_CREATE,
  FAILED_RATING_CREATE,
  SUCCESSFUL_RATING_UPDATE,
  FAILED_RATING_UPDATE,
  SUCCESSFUL_RATING_DELETE,
  FAILED_RATING_DELETE,
  SUCCESSFUL_IMAGE_DELETE,
  FAILED_IMAGE_DELETE,
  SUCCESSFUL_IMAGE_CREATE,
  FAILED_IMAGE_CREATE,
  RESET_REDIRECT_TO_LIST,
} from './imageType';

export const fetchAllImages = () => async (dispatch) => {
  dispatch({ type: FETCH_IMAGES });

  try {
    const response = await imagesUploadApi.get('/images');
    dispatch({ type: SUCCESSFUL_IMAGES_FETCH, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_IMAGES_FETCH,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const fetchImage = (imageId) => async (dispatch, getState) => {
  dispatch({ type: FETCH_IMAGE });

  const image = checkIfImageFetched(imageId, getState());
  if (image) {
    return dispatch({ type: SUCCESSFUL_IMAGE_FETCH, payload: image });
  }

  dispatch(fetchAllImages());
};

export const addComment = (imageId, comment) => async (dispatch) => {
  dispatch({ type: LOADING_COMMENT_CREATE });

  try {
    const response = await imagesUploadApi.post(
      '/comments/' + imageId,
      comment
    );
    dispatch({ type: SUCCESSFUL_COMMENT_CREATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_COMMENT_CREATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const deleteComment = (imageId, comment) => async (dispatch) => {
  try {
    const formattedUrl = `/comments/${imageId}/${comment._id}`;

    // eslint-disable-next-line no-unused-vars
    const response = await imagesUploadApi.delete(formattedUrl);
    dispatch({ type: SUCCESSFUL_COMMENT_DELETE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_COMMENT_DELETE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const updateComment = (imageId, commentId, updatedComment) => async (
  dispatch
) => {
  try {
    const formattedUrl = `/comments/${imageId}/${commentId}`;
    const response = await imagesUploadApi.put(formattedUrl, updatedComment);
    dispatch({ type: SUCCESSFUL_COMMENT_UPDATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_COMMENT_UPDATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const createRating = (imageId, rating) => async (dispatch) => {
  try {
    const response = await imagesUploadApi.post('/ratings', {
      imageId,
      rating,
    });
    dispatch({ type: SUCCESSFUL_RATING_CREATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_RATING_CREATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const updateRating = (imageId, ratingId, vote) => async (dispatch) => {
  try {
    const formattedUrl = `/ratings/${imageId}/${ratingId}`;
    const response = await imagesUploadApi.put(formattedUrl, {
      rating: vote,
    });
    dispatch({ type: SUCCESSFUL_RATING_UPDATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_RATING_UPDATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const deleteRating = (imageId, ratingId) => async (dispatch) => {
  try {
    const formattedUrl = `/ratings/${imageId}/${ratingId}`;
    const response = await imagesUploadApi.delete(formattedUrl);
    dispatch({ type: SUCCESSFUL_RATING_DELETE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_RATING_DELETE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const deleteImage = (imageId) => async (dispatch) => {
  try {
    const formattedUrl = `/images/${imageId}`;
    const response = await imagesUploadApi.delete(formattedUrl);
    dispatch({ type: SUCCESSFUL_IMAGE_DELETE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_IMAGE_DELETE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const createImage = (title, image) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const response = await imagesUploadApi.post('/images', formData);
    dispatch({ type: SUCCESSFUL_IMAGE_CREATE, payload: response.data });
  } catch (e) {
    dispatch({
      type: FAILED_IMAGE_CREATE,
      payload: (e.response && e.response.data.error) || e.message,
    });
  }
};

export const resetToListRedirect = () => {
  return {
    type: RESET_REDIRECT_TO_LIST,
  };
};

const checkIfImageFetched = (imageId, state) => {
  const images = state.images.data;
  const foundImages = images.filter((img) => img._id === imageId);

  if (foundImages.length === 0) {
    return null;
  }

  return foundImages[0];
};
