import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { createImage, resetToListRedirect } from '../../redux/actions';
import { withRouter } from 'react-router-dom';

const ImageCreate = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const redirectToListRequired = useSelector(
    (state) => state.images.redirectToListRequired
  );

  const redirect = () => {
    history.push('/images');
    dispatch(resetToListRedirect());
  };

  useEffect(() => {
    if (redirectToListRequired) {
      redirect();
    }
  }, [redirectToListRequired]);

  const handleFileUploadChange = (newImage) => {
    setImage(newImage);
  };

  const handleSubmit = () => {
    dispatch(createImage(title, image[0]));
  };

  return (
    <Container className={classes.container}>
      <Card>
        <CardHeader title="Add New Image" />
        <Divider />
        <CardContent>
          <TextField
            className={classes.textField}
            name="title"
            variant="outlined"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <DropzoneArea
            acceptedFiles={['image/jpeg']}
            filesLimit={1}
            showAlerts={false}
            onChange={handleFileUploadChange}
          />
          <Button
            onClick={handleSubmit}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

ImageCreate.propTypes = {
  history: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: theme.spacing(100),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));

export default withRouter(ImageCreate);
