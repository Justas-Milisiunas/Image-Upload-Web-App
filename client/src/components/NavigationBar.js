import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, Button, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import LoginDialog from './Authentication/LoginDialog';
import RegisterDialog from './Authentication/RegisterDialog';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

const NavigationBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleRegisterDialogClose = () => {
    setRegisterDialogOpen(false);
  };

  const renderSignUpButton = () => {
    return (
      <Button
        className={classes.button}
        color="inherit"
        onClick={() => setRegisterDialogOpen(!loginDialogOpen)}
      >
        Sign Up
      </Button>
    );
  };

  const renderSignInButton = () => {
    return (
      <Button
        className={classes.button}
        color="inherit"
        onClick={() => setLoginDialogOpen(!loginDialogOpen)}
      >
        Sign In
      </Button>
    );
  };

  const renderNavigationButtonsWhenLoggedIn = () => {
    return (
      <>
        <ProfileMenu />
      </>
    );
  };

  const renderNavigationButtonsWhenNotLoggedIn = () => {
    return (
      <>
        {renderSignInButton()}
        {renderSignUpButton()}
      </>
    );
  };

  return (
    <div className={classes.toolbarDiv}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/images" className={classes.link}>
              Images Upload App
            </Link>
          </Typography>
          {user.isSignedIn
            ? renderNavigationButtonsWhenLoggedIn()
            : renderNavigationButtonsWhenNotLoggedIn()}
        </Toolbar>
        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
        <RegisterDialog
          open={registerDialogOpen}
          onClose={handleRegisterDialogClose}
        />
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {},
  title: {
    flexGrow: 1,
  },
  toolbarDiv: {
    marginBottom: theme.spacing(2),
  }
}));

export default NavigationBar;
