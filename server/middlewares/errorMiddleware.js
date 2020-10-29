// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message || 'There was a problem with the server' });
};
