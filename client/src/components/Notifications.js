import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

// TODO: Fix bug where empty notification shows

const Notifications = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let lastNotificationMessage = '';

  const notification = useSelector((state) => {
    if (state.user.error && lastNotificationMessage !== state.user.error) {
      return { type: 'error', message: state.user.error };
    }

    if (state.images.error && lastNotificationMessage !== state.images.error) {
      return { type: 'error', message: state.images.error };
    }

    if (state.user.message && lastNotificationMessage !== state.user.message) {
      return { type: 'success', message: state.user.message };
    }

    if (
      state.images.message &&
      lastNotificationMessage !== state.images.message
    ) {
      return { type: 'success', message: state.images.message };
    }

    return { type: 'success', message: '' };
  });

  useEffect(() => {
    if (notification) {
      setOpenSnackbar(true);
      lastNotificationMessage = notification.message;
    }
  }, [notification.message]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    lastNotificationMessage = '';
  };

  const renderNotification = () => {
    return (
      <Alert onClose={handleSnackbarClose} severity={notification.type}>
        {notification.message}
      </Alert>
    );
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        {notification && renderNotification()}
      </Snackbar>
    </>
  );
};

export default Notifications;
