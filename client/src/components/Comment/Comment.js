import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteComment, updateComment } from '../../redux/actions';
import CommentEditDialog from './CommentEditDialog';

const CommentShow = ({ comment, imageId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openCommentEditDialog, setOpenCommentEditDialog] = useState(false);
  const user = useSelector((state) => state.user.isSignedIn && state.user.data);

  const handleEditCommentClick = () => {
    setOpenCommentEditDialog(true);
  };

  const handleDeleteCommentClick = () => {
    dispatch(deleteComment(imageId, comment));
  };

  const handleCommentEditDialogClose = () => {
    setOpenCommentEditDialog(false);
  };

  const renderEditButtonIfCreatorOrAdmin = () => {
    return (
      (user.role === 2 || comment.userId === user._id) && (
        <div>
          <Tooltip title="Edit comment">
            <IconButton onClick={handleEditCommentClick}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete comment">
            <IconButton onClick={handleDeleteCommentClick} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )
    );
  };

  return (
    <Card style={{ borderRadius: 0 }}>
      <CommentEditDialog
        open={openCommentEditDialog}
        onClose={handleCommentEditDialogClose}
        imageId={imageId}
        comment={comment}
      />
      <CardHeader
        avatar={<Avatar>U</Avatar>}
        title={comment.message}
        action={renderEditButtonIfCreatorOrAdmin()}
      />
    </Card>
  );
};

CommentShow.propTypes = {
  comment: PropTypes.object.isRequired,
  imageId: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({}));

export default CommentShow;
