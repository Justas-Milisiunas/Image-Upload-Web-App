import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { updateComment } from '../../redux/actions';

const CommentEditDialog = ({ open, onClose, imageId, comment }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: { message: comment.message },
  });

  const onSubmit = (updatedComment) => {
    dispatch(updateComment(imageId, comment._id, updatedComment));
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Update Comment</DialogTitle>
      <DialogContent>
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          inputRef={register}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          variant="contained"
          color="primary"
        >
          Update
        </Button>
        <Button onClick={() => onClose()} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CommentEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

export default CommentEditDialog;
