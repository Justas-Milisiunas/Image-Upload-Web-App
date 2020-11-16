const commentsService = require('../services/commentsService');

module.exports.getAllComments = async (req, res) => {
  const allComments = await commentsService.getComments();
  res.send(allComments);
};

module.exports.getImageComments = async (req, res, next) => {
  const imageId = req.params.id;

  try {
    const foundComments = await commentsService.getImageComments(imageId);
    res.send(foundComments);
  } catch (e) {
    next(e);
  }
};

module.exports.updateComment = async (req, res, next) => {
  const { imageId, id: commentId } = req.params;
  const commentUpdatedData = req.body;
  const { user } = req;

  try {
    const updatedComment = await commentsService.updateComment(
      imageId,
      commentId,
      commentUpdatedData,
      user
    );

    res.send(updatedComment);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  const { imageId, id } = req.params;
  const { user } = req;

  try {
    const deletedComment = await commentsService.deleteComment(
      imageId,
      id,
      user
    );
    res.send(deletedComment);
  } catch (e) {
    next(e);
  }
};

module.exports.createComment = async (req, res, next) => {
  const newCommentData = req.body;
  const userId = req.user._id;
  const imageId = req.params.imageId;

  try {
    const createdComment = await commentsService.createComment(
      imageId,
      userId,
      newCommentData
    );

    res.send(createdComment);
  } catch (e) {
    next(e);
  }
};
