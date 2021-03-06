require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');

const swaggerDocument = require('./swagger.json');
const {
  imagesRoute,
  usersRoute,
  commentsRoute,
  ratingsRoute,
  authRoute,
} = require('./routes');

const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

// DB connection
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
mongoose.set('useFindAndModify', false);

const mongoDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1ekcu.azure.mongodb.net/image-upload-api?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

const PORT = process.env.PORT || 3000;
const app = express();

// Logging middleware
app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_ORIGIN }));
app.use(cookieParser());

// Json body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// multipart/form-data parsing
const upload = multer({ destination: 'uploads/' });
app.use(upload.single('image'));

// Authorization parsing
app.use(authMiddleware.user);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/images', imagesRoute);
app.use('/users', usersRoute);
app.use('/comments', commentsRoute);
app.use('/ratings', ratingsRoute);
app.use('/auth', authRoute);

app.use(errorMiddleware.errorHandler);

app.listen(PORT, () => console.log(`Server started, listening at: ${PORT}`));
