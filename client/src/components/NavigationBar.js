import React from 'react';
import { useDispatch } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

import { signIn } from '../redux/actions';

const NavigationBar = () => {
  const dispatch = useDispatch();
  return (
    <Toolbar variant="regular">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(signIn('dzionis', 'password'));
        }}
      >
        Primary
      </Button>
    </Toolbar>
  );
};

export default NavigationBar;
