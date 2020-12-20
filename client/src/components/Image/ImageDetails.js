import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import {
  Card,
  Container,
  makeStyles,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

import { deleteImage, fetchImage } from '../../redux/actions';
import Comment from '../Comment/Comment';
import CommentCreate from '../Comment/CommentCreate';
import ImageRating from './ImageRating';

const ImageDetails = ({ history }) => {
  const { id: imageId } = useParams();
  const classes = useStyles();

  const dispatch = useDispatch();
  const image = useSelector(
    (state) => state.images.data.filter((img) => img._id === imageId)[0]
  );
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchImage(imageId));
  }, [dispatch, imageId]);

  const canUserUseActionButtons =
    user && image && (user._id === image.userId || user.role === 2);

  const handleEditButtonClick = () => {};

  const handleDeleteButtonClick = () => {
    dispatch(deleteImage(imageId));
    history.push('/images');
  };

  const renderActionButtons = () => {
    return (
      <div className={classes.actionButtons}>
        {canUserUseActionButtons && (
          <>
            {/* <Button
              onClick={handleEditButtonClick}
              className={classes.actionButton}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button> */}
            <Button
              onClick={handleDeleteButtonClick}
              className={classes.actionButton}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    );
  };

  const renderImageDetails = () => {
    if (!image) {
      // TODO: Add spinner
      return null;
    }

    return (
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.cardHeader}>
          <div className={classes.imageTitleInfo}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {image.title}
            </Typography>
            <ImageRating image={image} />
          </div>
          {canUserUseActionButtons && renderActionButtons()}
        </CardContent>
        <div className={classes.contentPanel}>
          <div className={classes.leftPanel}>
            <CardMedia
              className={classes.image}
              component="img"
              alt={image.title}
              image={image.url}
              title={image.title}
            />
          </div>
          <div className={classes.rightPanel}>
            {renderImageComments()}
            {user && <CommentCreate imageId={image._id} />}
          </div>
        </div>
      </Card>
    );
  };

  const renderImageComments = () => {
    return image.comments.map((comment) => {
      return <Comment key={comment._id} comment={comment} imageId={imageId} />;
    });
  };

  return (
    <Container className={classes.container}>{renderImageDetails()}</Container>
  );
};

ImageDetails.propTypes = {
  history: PropTypes.object,
};

// TODO: Remove changed font
const useStyles = makeStyles((theme) => ({
  container: {},
  card: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  title: {
    fontFamily: 'Courier New',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  imageTitleInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexEnd',
  },
  actionButton: {
    marginLeft: theme.spacing(2),
  },
  contentPanel: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  leftPanel: {
    flexGrow: 3,
    flexShrink: 1,
  },
  rightPanel: {
    flexGrow: 1,
    flexShrink: 2,
  },
}));

export default withRouter(ImageDetails);
