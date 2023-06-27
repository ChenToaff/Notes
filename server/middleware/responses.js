module.exports = function (req, res, next) {
  /**
   * (default status 200)
   * Success response
   */
  res.success = function ({ status = 200, data, message = "" }) {
    return res.json({
      status,
      data,
      message,
    });
  };

  /**
   * Custom error response
   */
  res.error = function ({ status = 400, message = "" }) {
    return res.json({
      status,
      message,
    });
  };

  next();
};
