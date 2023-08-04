const fs = require("fs");
// automatically deletes uploaded files when express finishes the request
module.exports = function (req, res, next) {
  var writeHead = res.writeHead;
  var writeHeadbound = writeHead.bind(res);
  res.writeHead = function (statusCode, statusMessage, headers) {
    if (req.files) {
      for (var file of req.files) {
        fs.unlink(file.path, function (err) {
          if (err) console.error(err);
        });
      }
    }
    writeHeadbound(statusCode, statusMessage, headers);
  };

  next();
};
