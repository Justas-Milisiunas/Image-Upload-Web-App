import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import { signIn } from '../../redux/actions';

const LoginDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const isUserSignedIn = useSelector((state) => state.user.isSignedIn);

  const onSubmit = ({ email, password }) => {
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (isUserSignedIn) {
      onClose();
    }
  }, [isUserSignedIn, onClose]);

  return (
    <Dialog style={{ padding: 10 }} open={open} onClose={() => onClose()}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginDialog;
