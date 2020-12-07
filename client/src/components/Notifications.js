import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const Notifications = () => {
  const error = useSelector((state) => state.user.error || state.images.error);
  const message = useSelector((state) => state.user.message);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (error || message) {
      setOpenSnackbar(true);
    }
  }, [error, message]);

  const conditionallyRenderAlert = () => {
    if (error) {
      return (
        <Alert onClose={handleErrorSnackbarClose} severity="error">
          {error}
        </Alert>
      );
    }

    if (message) {
      return (
        <Alert onClose={handleErrorSnackbarClose} severity="success">
          {message}
        </Alert>
      );
    }

    return null;
  };

  const handleErrorSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        {conditionallyRenderAlert()}
      </Snackbar>
    </>
  );
};

export default Notifications;
