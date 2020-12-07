import { Button, TextField, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

// TODO: Add client side validation
const LoginForm = ({ submitButtonText = 'Log In', onSubmit }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const error = useSelector((state) => state.user.error);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className={classes.formDiv}>
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
          onClick={handleSubmit(handleFormSubmit)}
          type="submit"
          variant="contained"
          color="primary"
        >
          {submitButtonText}
        </Button>
      </Container>
    </div>
  );
};

LoginForm.propTypes = {
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '20vw',
    gap: '1rem',
  },
});

export default LoginForm;
