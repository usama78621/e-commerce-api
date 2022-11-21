const jwt = require("jsonwebtoken");

const createJWT = async ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isValidToken = ({ token }) => jwt.verify(token, process.env.JWT_LIFETIME);

const attachCookiesToRosponse = async ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = { createJWT, isValidToken, attachCookiesToRosponse };
