require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const {imagesRoute, usersRoute, commentsRoute, ratingsRoute} = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

// DB connection
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const mongoDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1ekcu.azure.mongodb.net/image-upload-api?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Json body parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/images', imagesRoute);
app.use('/users', usersRoute);
app.use('/comments', commentsRoute);
app.use('/ratings', ratingsRoute);

app.listen(PORT, () => console.log(`Server started, listening at: ${PORT}`));