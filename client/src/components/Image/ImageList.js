import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  Container,
  CardMedia,
  Button,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { fetchAllImages } from '../../redux/actions';
import ImageRating from './ImageRating';

const ImageList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const images = useSelector((state) => state.images.data);

  useEffect(() => {
    dispatch(fetchAllImages());
  }, [dispatch]);

  const renderImageList = () => {
    return images.map((img) => {
      return (
        <Link to={`/images/${img._id}`} className={classes.link} key={img._id}>
          <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.cardHeader}>
              <Typography gutterBottom variant="h5" component="h2">
                {img.title}
              </Typography>
              <ImageRating image={img} />
            </CardContent>
            <CardMedia
              className={classes.image}
              component="img"
              alt={img.title}
              image={img.url}
              title={img.title}
            />
          </Card>
        </Link>
      );
    });
  };

  if (!images) {
    return 'Loading...';
  }

  return (
    <Container className={classes.imageList}>
      <Link to="/images/create" style={{ textDecoration: 'none' }}>
        <Fab className={classes.addButton} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      {renderImageList()}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    flexShrink: 1,
  },
  image: {
    maxWidth: '100%',
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
  imageList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
  },
  addButton: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(10),
    bottom: theme.spacing(10),
    left: 'auto',
    position: 'fixed',
    transform: 'scaleX(1.5) scaleY(1.5)',
  },
}));

export default ImageList;
