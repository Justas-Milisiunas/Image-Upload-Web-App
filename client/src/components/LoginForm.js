import { Button, TextField, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../redux/actions';

// TODO: Add client side validation
const LoginForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const error = useSelector((state) => state.user.error);

  const onSubmit = ({ email, password }) => {
    dispatch(signIn(email, password));
  };

  return (
    <div>
      {error}
      <Container className={classes.container}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          inputRef={register}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          inputRef={register}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    gap: '1rem',
  },
});

export default LoginForm;
