var jwt = require('jsonwebtoken');

let secret = process.env.JWT_SECRET || "your_secret";
module.exports.secret = secret;

module.exports.createJWTToken = function (details) {
  console.log(details);
  if (typeof details !== 'object') {
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600
  }

  let token = jwt.sign({
    data: details.sessionData
  }, secret, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    })

  return token
};
