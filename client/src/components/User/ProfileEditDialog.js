import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/actions';
import PropTypes from 'prop-types';

import ProfileEditForm from './ProfileEditForm';

const ProfileEditDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const onSubmit = (updatedUserData) => {
    dispatch(updateProfile(updatedUserData));
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <ProfileEditForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

ProfileEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileEditDialog;
