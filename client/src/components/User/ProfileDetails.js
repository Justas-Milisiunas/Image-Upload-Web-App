import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';

const ProfileDetails = ({ user }) => {
  const formatUserRole = () => {
    if (user.role === 1) {
      return 'Registered User';
    } else if (user.role === 2) {
      return 'Admin';
    }

    return 'Not Found';
  };

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary={`Email: ${user.email}`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={`Role: ${formatUserRole()}`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary={`Registration Date: ${user.registrationDate}`} />
      </ListItem>
    </List>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileDetails;
