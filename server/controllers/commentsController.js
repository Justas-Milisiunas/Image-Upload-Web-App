const HttpStatus = require('http-status-codes');

const commentsService = require('../services/commentsService');

module.exports.getAllComments = async (req, res) => {
    const allComments = await commentsService.getComments();
    res.send(allComments);
}

module.exports.getImageComments = async (req, res) => {
    const imageId = req.params.id;
    const foundComments = await commentsService.getImageComments(imageId);

    if (!foundComments) {
        return res.status(HttpStatus.NOT_FOUND).send({error: 'Image not found'});
    }

    res.send(foundComments);
}

module.exports.updateComment = async (req, res) => {
    const {imageId, id: commentId} = req.params;
    const updateImageData = req.body;

    const updatedComment = await commentsService.updateComment(imageId, commentId, updateImageData);
    if (!updatedComment) {
        return res.status(HttpStatus.BAD_REQUEST).send({error: 'Invalid comment data'});
    }

    res.send(updatedComment);
}

module.exports.deleteComment = async (req, res) => {
    const {imageId, id} = req.params;

    const deletedComment = await commentsService.deleteComment(imageId, id);
    if (!deletedComment) {
        return res.status(HttpStatus.BAD_REQUEST).send({error: 'Comment not found'});
    }

    res.send(deletedComment);
}

module.exports.createComment = async (req, res) => {
    const newCommentData = req.body;
    const userId = req.user._id;
    const imageId = req.params.imageId;

    const createdComment = await commentsService.createComment(imageId, userId, newCommentData);
    if(!createdComment) {
        return res.status(HttpStatus.BAD_REQUEST).send({error: 'Invalid comment data'});
    }

    res.send(createdComment);
}