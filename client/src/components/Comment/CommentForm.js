import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import {
  Button,
  TextField,
  Card,
  makeStyles,
  CardContent,
  Divider,
} from '@material-ui/core';

const CommentForm = ({ onSubmit }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <Card className={classes.card}>
      <Divider />
      <CardContent className={classes.cardContent}>
        <TextField
          className={classes.commentTextField}
          name="message"
          label="Comment"
          variant="outlined"
          inputRef={register}
        />
        <Button
          className={classes.submitButton}
          onClick={handleSubmit(onSubmit)}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles({
  card: {
    borderRadius: 0,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    flexGrow: 1,
  },
  commentTextField: {
    marginRight: '1vw',
    flexGrow: 6,
  },
});

export default CommentForm;
