import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader } from '@material-ui/core';

const CommentShow = ({ comment }) => {
  return (
    <Card style={{ borderRadius: 0 }}>
      <CardHeader avatar={<Avatar>U</Avatar>} title={comment.message} />
    </Card>
  );
};

CommentShow.propTypes = {
  comment: PropTypes.object,
};

export default CommentShow;
