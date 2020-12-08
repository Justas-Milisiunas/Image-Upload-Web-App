import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDetails from './ProfileDetails';
import { deleteProfile } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import ProfileEditDialog from './ProfileEditDialog';

const UserProfile = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    dispatch(deleteProfile());
    history.push('/images');
  };

  const handleEditClick = () => {
    setEditProfileDialogOpen(true);
  };

  const handleEditProfileDialogClose = () => {
    setEditProfileDialogOpen(false);
  };

  return (
    <Container>
      <Card variant="outlined">
        <CardHeader
          title="Profile details"
          avatar={<Avatar>{user.email[0].toUpperCase()}</Avatar>}
          action={
            <>
              <Button
                onClick={handleEditClick}
                className={classes.button}
                startIcon={<EditIcon />}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={handleDeleteClick}
                className={classes.button}
                startIcon={<DeleteIcon />}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </>
          }
        />
        <Divider />
        <CardContent>
          <ProfileDetails user={user} />
        </CardContent>
      </Card>
      <ProfileEditDialog
        open={editProfileDialogOpen}
        onClose={handleEditProfileDialogClose}
      />
    </Container>
  );
};

UserProfile.propTypes = {
  history: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default withRouter(UserProfile);
