import { Chip, makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { createRating, deleteRating, updateRating } from '../../redux/actions';

const ImageRating = ({ image }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const totalVotes = _.sumBy(image.rating, 'rating');

  const getUserRating = () => {
    if (!user) {
      return null;
    }

    const foundUserRatings = image.rating.filter(
      (rating) => rating.userId === user._id
    );
    return foundUserRatings.length > 0 ? foundUserRatings[0] : null;
  };

  const handleRating = (vote) => {
    if (!getUserRating()) {
      return dispatch(createRating(image._id, vote));
    }
    if (getUserRating().rating === vote) {
      return dispatch(deleteRating(image._id, getUserRating()._id));
    } else {
      return dispatch(
        updateRating(
          image._id,
          getUserRating()._id,
          getUserRating().rating === 1 ? -1 : 1
        )
      );
    }
  };

  return (
    <div className={classes.ratingButtons}>
      <ArrowUpwardIcon
        color={
          getUserRating() && getUserRating().rating === 1
            ? 'primary'
            : undefined
        }
        onClick={() => handleRating(1)}
        className={classes.ratingButton}
      />
      <ArrowDownwardIcon
        color={
          getUserRating() && getUserRating().rating === -1
            ? 'primary'
            : undefined
        }
        onClick={() => handleRating(-1)}
        className={classes.ratingButton}
      />
      <Chip size="small" label={`Total: ${totalVotes}`} />
    </div>
  );
};

ImageRating.propTypes = {
  image: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  ratingButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingButton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}));

export default ImageRating;
