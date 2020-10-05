const mongoose = require('mongoose');
const _ = require('lodash');

const RatingStatus = require('./ratingStatus');

const RatingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User ID is required'],
        immutable: true
    },
    rating: {
        type: Number,
        enum: [RatingStatus.DOWNVOTE, RatingStatus.UPVOTE],
        required: [true, 'Rating status is required']
    }
});

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User ID is required'],
        immutable: true
    },
    message: {
        type: String,
        required: [true, 'Comment message is required']
    }
});

const ImageModelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User ID is required'],
        immutable: true
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
        type: String,
        required: [true, 'Extension is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    rating: {
        type: [RatingSchema]
    },
    comments: {
        type: [CommentSchema]
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret, options) => {
            delete ret.id;
        }
    }
});

ImageModelSchema.methods.addRating = async function (userId, rating) {
    const newRating = {userId, rating};

    // Creates rating subdoc without adding to the Image document
    const savedRating = await this.rating.create(newRating);
    const error = savedRating.validateSync()

    if (error) {
        console.log(error.message);
        return null;
    }

    // Check if user has not already rated this image
    const userAlreadyRated = this.rating.filter(r => r.userId.toString() === userId).length > 0;
    if (userAlreadyRated) {
        return null;
    }

    // Adds rating subdoc to the Image document
    await this.updateOne({
        $push: {rating: savedRating}
    });

    return savedRating;
}

ImageModelSchema.methods.deleteRating = async function (ratingId) {
    const foundRating = this.rating.id(ratingId);
    if (!foundRating) {
        return null;
    }

    foundRating.remove();
    await this.save();

    return foundRating;
}

ImageModelSchema.methods.updateRating = async function (ratingId, ratingData) {
    const foundRating = this.rating.id(ratingId);
    if (!foundRating) {
        return null;
    }

    if (foundRating.rating === ratingData.rating) {
        return null;
    }

    foundRating.rating = ratingData.rating;

    // Checks if new rating is valid
    const error = this.validateSync();
    if (error) {
        console.log(error.message);
        return null;
    }

    await this.save();
    return foundRating;
}

ImageModelSchema.methods.addComment = async function (userId, message) {
    const newComment = {userId, ...message};
    const commentDocument = await this.comments.create(newComment);

    const error = commentDocument.validateSync();
    if (error) {
        console.log(error.message);
        return null;
    }

    await this.updateOne({
        $push: {comments: commentDocument}
    });

    return commentDocument;
}

ImageModelSchema.methods.deleteComment = async function(commentId) {
    const foundComment = this.comments.id(commentId);
    if (!foundComment) {
        return null;
    }

    foundComment.remove();
    await this.save();

    return foundComment;
}

ImageModelSchema.methods.updateComment = async function(commentId, updatedData) {
    let foundComment = this.comments.id(commentId);
    if (!foundComment) {
        return null;
    }

    foundComment.set(updatedData);

    const error = foundComment.validateSync();
    if (error) {
        console.log(error);
        return null;
    }

    await this.save();
    return foundComment;
}

ImageModelSchema.virtual('ratingSum').get(function () {
    return this.rating.reduce((sum, r) => sum + r.rating, 0);
});

ImageModelSchema.virtual('url').get(function () {
    return process.env.HOST_IP + '/images/' + this._id;
});

ImageModelSchema.statics.getAllRatings = async function () {
    const allImages = await this.find({}, 'rating');
    return allImages.map(image => image.rating).flat();
}

ImageModelSchema.statics.getAllComments = async function () {
    const allImages = await this.find({}, 'comments');
    return allImages.map(image => image.comments).flat();
}

module.exports = mongoose.model('Image', ImageModelSchema);