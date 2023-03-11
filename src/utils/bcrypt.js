const bcrypt = require("bcrypt");

const hashString = (string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(string, salt);
};

const compareStringWithHash = (string, hash) => {
  return bcrypt.compareSync(string, hash);
};

module.exports = {
  hashString,
  compareStringWithHash,
};
