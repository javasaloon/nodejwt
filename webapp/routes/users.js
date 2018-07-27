var express = require('express');
var router = express.Router();

const auth = require('../libs/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function (req, res, next) {

  auth.verifyJWTToken(req, res, next);

  res.status(200)
    .json({
      success: true
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body

  let user = { "email": email };


  res.status(200)
    .json({
      success: true,
      token: auth.createJWTToken({
        sessionData: user,
        maxAge: 3600
      })
    });
});




module.exports = router;
