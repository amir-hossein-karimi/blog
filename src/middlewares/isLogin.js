const { user } = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");

const isLogin = async (req, res, next) => {
  try {
    const userToken = req.headers.token;

    const { error, decode } = verifyToken(userToken);

    if (error)
      throw { status: StatusCodes.UNAUTHORIZED, message: "unAuthorized" };

    if (decode.username) {
      const loginsUser = await user.getOne(
        { username: decode.username },
        { password: 0, __v: 0 }
      );
      if (loginsUser.data.token === userToken) {
        req.user = loginsUser.data;
      } else
        throw { status: StatusCodes.UNAUTHORIZED, message: "unAuthorized" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLogin,
};
