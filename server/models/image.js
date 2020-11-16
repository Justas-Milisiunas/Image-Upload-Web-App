const mongoose = require('mongoose');

const ImageSchema = require('./schemas/imageSchema');

module.exports = mongoose.model('Image', ImageSchema);
