import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const ProfileEditForm = ({ onSubmit }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const removeEmptyFields = (data) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });

    return data;
  };

  const handleFormSubmit = (data) => {
    const filteredData = removeEmptyFields(data);
    onSubmit(filteredData);
  };

  return (
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
        Update
      </Button>
    </Container>
  );
};

ProfileEditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

export default ProfileEditForm;
