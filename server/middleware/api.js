module.exports = function api(req, res, next) {
  if (req.headers.token != process.env.Token) {
    res.send(
      "This is not a valid api token or token is not present, please make sure you have the right api key"
    );
  } else {
    next();
  }
};
