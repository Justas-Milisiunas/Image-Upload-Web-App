import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Card,
  Container,
  makeStyles,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { fetchImage } from '../redux/actions/imageActions';
import Comment from './Comment/CommentShow';
import CommentCreate from './Comment/CommentCreate';

const ImageDetails = () => {
  const { id: imageId } = useParams();
  const classes = useStyles();

  const dispatch = useDispatch();
  const image = useSelector(
    (state) => state.images.data.filter((img) => img._id === imageId)[0]
  );

  useEffect(() => {
    dispatch(fetchImage(imageId));
  }, []);

  const renderImageDetails = () => {
    if (!image) {
      // TODO: Add spinner
      return null;
    }

    return (
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.cardHeader}>
          <Typography gutterBottom variant="h5" component="h2">
            {image.title}
          </Typography>
          <div className={classes.ratingButtons}>
            <ArrowUpwardIcon className={classes.ratingButton} />
            <ArrowDownwardIcon className={classes.ratingButton} />
          </div>
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
            <CommentCreate imageId={image._id} />
          </div>
        </div>
      </Card>
    );
  };

  const renderImageComments = () => {
    return image.comments.map((comment) => {
      return <Comment key={comment._id} comment={comment} />;
    });
  };

  return (
    <Container className={classes.container}>{renderImageDetails()}</Container>
  );
};

const useStyles = makeStyles({
  container: {
    width: '75vw',
    height: 100,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  ratingButton: {
    width: '2rem',
    height: '2rem',
    marginLeft: '1vw',
  },
  contentPanel: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  leftPanel: {
    flexGrow: 3,
    flexShrink: 1,
  },
  rightPanel: {
    flexGrow: 1,
    flexShrink: 2,
    marginLeft: '1vw',
  },
});

export default ImageDetails;
