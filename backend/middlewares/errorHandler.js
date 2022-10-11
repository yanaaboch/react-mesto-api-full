const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack || err);
  const status = err.statusCode || 500;
  const message = status === 500 ? 'На сервере произошла ошибка.' : err.message;
  res.status(status).send({ message });
  next();
};

module.exports = errorHandler;
