const mongoose = require('mongoose');

const ImageModelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User ID is required']
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 letters long']
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    extension: {
        type: String
    },
    title: {
        type: String
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret, options) => {
            delete ret.id;
        }
    }
});

ImageModelSchema.virtual('url').get(function() {
   return process.env.HOST_IP + '/images/' + this._id;
});

module.exports = mongoose.model('Image', ImageModelSchema);