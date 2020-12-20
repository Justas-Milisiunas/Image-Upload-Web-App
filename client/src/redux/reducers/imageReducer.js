import {
  FAILED_IMAGES_FETCH,
  FAILED_IMAGE_FETCH,
  FETCH_IMAGE,
  FETCH_IMAGES,
  SUCCESSFUL_IMAGES_FETCH,
  SUCCESSFUL_IMAGE_FETCH,
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
} from '../actions/image/imageType';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  data: [],
  redirectToListRequired: false,
};

// TODO: Refactor actions related to working with comments to different reducer

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_COMMENT_CREATE:
    case FETCH_IMAGES:
    case FETCH_IMAGE: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SUCCESSFUL_IMAGES_FETCH: {
      const images = action.payload;

      return {
        ...state,
        data: images,
        isLoading: false,
        error: null,
      };
    }
    case SUCCESSFUL_IMAGE_FETCH: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case SUCCESSFUL_COMMENT_CREATE: {
      const comment = action.payload;

      const foundImage = findImageInStateWithComment(comment, state);
      if (!foundImage) {
        return {
          ...state,
          isLoading: false,
        };
      }

      const clonedImage = { ...foundImage };
      clonedImage.comments.push(comment);

      const imagesWithoutUpdated = state.data.filter(
        (img) => img._id !== clonedImage._id
      );
      imagesWithoutUpdated.push(clonedImage);

      return {
        ...state,
        data: imagesWithoutUpdated,
        isLoading: false,
        error: null,
        message: 'New comment was created successfully',
      };
    }
    case SUCCESSFUL_COMMENT_DELETE: {
      const comment = action.payload;

      const imagesList = getUpdatedImageStateWithoutComment(comment, state);
      if (!imagesList) {
        return {
          ...state,
          message: 'Comment was deleted successfully',
          error: null,
        };
      }

      return {
        ...state,
        message: 'Comment was deleted successfully',
        error: null,
        data: imagesList,
      };
    }
    case SUCCESSFUL_COMMENT_UPDATE: {
      const updatedComment = action.payload;

      const updatedImageState = getImageStateWithUpdatedComment(
        updatedComment,
        state
      );

      return {
        ...state,
        data: updatedImageState,
        message: 'Comment was successfully updated!',
        error: null,
      };
    }
    case SUCCESSFUL_RATING_CREATE: {
      const rating = action.payload;

      const image = findImageInState(rating.imageId, state);
      if (!image) {
        return {
          ...state,
        };
      }

      const clonedImage = { ...image };
      clonedImage.rating.push(rating);

      const updatedImages = updateImageInState(clonedImage, state);
      return {
        ...state,
        data: updatedImages,
        message: 'New comment was successfully created!',
        error: null,
      };
    }
    case SUCCESSFUL_RATING_UPDATE: {
      const updatedRating = action.payload;

      const image = findImageInState(updatedRating.imageId, state);
      if (!image) {
        return {
          ...state,
          error: null,
        };
      }

      const clonedImage = { ...image };
      clonedImage.rating = clonedImage.rating.filter(
        (rating) => rating._id !== updatedRating._id
      );
      clonedImage.rating.push(updatedRating);

      const imageList = updateImageInState(clonedImage, state);

      return {
        ...state,
        message: 'Rating was successfully updated!',
        error: null,
        data: imageList,
      };
    }
    case SUCCESSFUL_RATING_DELETE: {
      const deletedRating = action.payload;
      const image = findImageInState(deletedRating.imageId, state);
      if (!image) {
        return {
          ...state,
          error: null,
        };
      }

      const clonedImage = { ...image };
      clonedImage.rating = clonedImage.rating.filter(
        (rating) => rating._id !== deletedRating._id
      );

      const updatedImageList = updateImageInState(clonedImage, state);
      return {
        ...state,
        message: 'Rating was deleted successfully!',
        error: null,
        data: updatedImageList,
      };
    }
    case SUCCESSFUL_IMAGE_DELETE: {
      const deletedImage = action.payload;
      const filteredImages = state.data.filter(
        (img) => img._id != deletedImage._id
      );
      return {
        ...state,
        message: 'Image was deleted successfully!',
        error: null,
        data: filteredImages,
      };
    }
    case SUCCESSFUL_IMAGE_CREATE: {
      const newImage = action.payload;

      return {
        ...state,
        message: 'New image was successfully added!',
        error: null,
        data: [...state.data, newImage],
        redirectToListRequired: true,
      };
    }
    case RESET_REDIRECT_TO_LIST: {
      return {
        ...state,
        redirectToListRequired: false,
      }
    }
    case FAILED_COMMENT_CREATE:
    case FAILED_IMAGE_FETCH:
    case FAILED_IMAGES_FETCH: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        message: null,
      };
    }
    case FAILED_COMMENT_DELETE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    case FAILED_COMMENT_UPDATE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    case FAILED_RATING_CREATE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    case FAILED_RATING_UPDATE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    case FAILED_RATING_DELETE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    case FAILED_IMAGE_DELETE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    case FAILED_IMAGE_CREATE: {
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    }
    default:
      return state;
  }
};

const getUpdatedImageStateWithoutComment = (deletedComment, state) => {
  const foundImage = findImageInStateWithComment(deletedComment, state);
  if (!foundImage) {
    return null;
  }

  const clonedImage = { ...foundImage };
  clonedImage.comments = clonedImage.comments.filter(
    (comment) => comment._id !== deletedComment._id
  );

  const updatedImages = updateImageInState(clonedImage, state);
  return updatedImages;
};

const getImageStateWithUpdatedComment = (updatedComment, state) => {
  const foundImage = findImageInStateWithComment(updatedComment, state);
  if (!foundImage) {
    return null;
  }

  const clonedImage = { ...foundImage };
  clonedImage.comments = clonedImage.comments.filter(
    (comment) => comment._id !== updatedComment._id
  );
  clonedImage.comments.push(updatedComment);

  const updatedImages = updateImageInState(clonedImage, state);
  return updatedImages;
};

const updateImageInState = (image, state) => {
  const filteredImages = state.data.filter((img) => img._id !== image._id);
  filteredImages.push(image);
  return filteredImages;
};

const findImageInStateWithComment = (comment, state) => {
  const foundImages = state.data.filter((img) => img._id === comment.imageId);
  if (foundImages.length <= 0) {
    return null;
  }

  return foundImages[0];
};

const findImageInState = (imageId, state) => {
  const foundImages = state.data.filter((img) => img._id === imageId);
  if (foundImages.length <= 0) {
    return null;
  }

  return foundImages[0];
};
