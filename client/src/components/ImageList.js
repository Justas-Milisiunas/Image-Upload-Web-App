import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link } from 'react-router-dom';

import { fetchAllImages } from '../redux/actions/imageActions';

const ImageList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const images = useSelector((state) => state.images.data);

  useEffect(() => {
    dispatch(fetchAllImages());
  }, []);

  const renderImageList = () => {
    return images.map((img) => {
      return (
        <Link to={`/images/${img._id}`} className={classes.link} key={img._id}>
          <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.cardHeader}>
              <Typography gutterBottom variant="h5" component="h2">
                {img.title}
              </Typography>
              <div className={classes.ratingButtons}>
                <ArrowUpwardIcon className={classes.ratingButton} />
                <ArrowDownwardIcon className={classes.ratingButton} />
              </div>
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
    <Container className={classes.imageList}>{renderImageList()}</Container>
  );
};

const useStyles = makeStyles({
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
  imageList: {
    width: '25%',
  },
  link: {
    textDecoration: 'none',
  },
});

export default ImageList;
