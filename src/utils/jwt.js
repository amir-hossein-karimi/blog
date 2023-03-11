const jwt = require("jsonwebtoken");
const {
  JWT_EXPIRE_TIME,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET_KEY,
} = require("../constants");

const createJWT = (payload, isRefresh = false) => {
  const token = jwt.sign(
    payload,
    isRefresh ? REFRESH_TOKEN_SECRET_KEY : JWT_SECRET_KEY,
    {
      expiresIn: isRefresh ? REFRESH_TOKEN_EXPIRE_TIME : JWT_EXPIRE_TIME,
    }
  );

  return token;
};

const verifyToken = (token, isRefresh = false) => {
  let decode;
  let error = false;
  jwt.verify(
    token,
    isRefresh ? REFRESH_TOKEN_SECRET_KEY : JWT_SECRET_KEY,
    (err, data) => {
      if (data) {
        decode = data;
      } else {
        error = true;
      }
    }
  );

  return {
    error,
    decode,
  };
};

module.exports = {
  createJWT,
  verifyToken,
};
