var jwt = require('jsonwebtoken');
var _ = require('lodash');


let secret = process.env.JWT_SECRET || "your_secret";

module.exports.verifyJWTToken = function (token) 
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, secret, (err, decodedToken) => 
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

module.exports.createJWTToken = function (details)
{
  if (typeof details !== 'object')
  {
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number')
  {
    details.maxAge = 3600
  }

  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) =>
  {
    if (typeof val !== "function" && key !== "password")
    {
      memo[key] = val
    }
    return memo
  }, {})

  let token = jwt.sign({
     data: details.sessionData
    }, secret, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
  })

  return token
};
 