const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const imagesRouter = require('./routes/images');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/images', imagesRouter);

app.listen(PORT, () => console.log(`Server started, listening at: ${PORT}`));