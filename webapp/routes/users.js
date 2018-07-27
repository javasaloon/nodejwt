var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var jwt = require('jsonwebtoken');
const auth = require('../libs/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/:id', function (req, res) {
  try {
    var decoded = jwt.verify(req.get("Authorization").substring(7), auth.secret);
    console.log(decoded);
    res.status(200)
      .json(
        decoded
      )
  } catch (err) {
    console.log(err);
    res.status(401)
      .json(
        {
          "status": 401, "msg": "make sure you have the header: Authorization with value of 'Bearer <token>'"
        }
      )
  }

});


router.post('/login', (req, res) => {
  console.log("body: " + JSON.stringify(req.body));
  let user = { "email": req.body.email };
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
