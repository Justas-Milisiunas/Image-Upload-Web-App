import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import LoginForm from './LoginForm';
import { signUp } from '../redux/actions';

const RegisterDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    dispatch(signUp(email, password));
  };

  return (
    <Dialog style={{ padding: 10 }} open={open} onClose={() => onClose()}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <LoginForm submitButtonText="Sign Up" onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterDialog;
