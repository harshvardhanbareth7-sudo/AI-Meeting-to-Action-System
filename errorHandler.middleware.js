function errorHandler(err, req, res, next) {
  // Keep error payloads minimal by default.
  // If you add logging, do it here centrally.
  // eslint-disable-next-line no-unused-vars
  const status = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message = status === 500 ? 'Internal Server Error' : (err.message || 'Request failed');
  res.status(status).json({ error: message });
}

module.exports = { errorHandler };

