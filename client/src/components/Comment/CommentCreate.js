import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../redux/actions/imageActions';
import CommentForm from './CommentForm';

const CommentCreate = ({ imageId }) => {
  const dispatch = useDispatch();

  const onSubmit = (comment) => {
    dispatch(addComment(imageId, comment));
  };

  return <CommentForm onSubmit={onSubmit} />;
};

CommentCreate.propTypes = {
  imageId: PropTypes.string.isRequired,
};

export default CommentCreate;
