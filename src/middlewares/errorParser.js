const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const errorParser = (req, res, next) => {
  const { errors } = validationResult(req);

  const messages = {};
  if (errors.length > 0) {
    errors.forEach((error) => {
      if (!messages?.[error.param]) {
        messages[error.param] = error.msg;
      }
    });
  }

  if (Object.keys(messages).length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: Object.values(messages)[0].includes("token" || "unAuthorization")
        ? StatusCodes.UNAUTHORIZED
        : StatusCodes.BAD_REQUEST,
      success: false,
      message: Object.values(messages)[0],
    });
  }

  next();
};

module.exports = {
  errorParser,
};
