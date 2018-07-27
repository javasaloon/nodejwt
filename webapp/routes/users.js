var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var ejwt = require('express-jwt');

var jwt = require('jsonwebtoken');
const auth = require('../libs/auth');

/* unprotected api GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


/* protected api, simply authenticate before enter this api */
router.get('/protected',
  ejwt({ secret: auth.secret }),
  function (req, res) {

    res.sendStatus(200);
  });

/* protected api GET one user by id. You can do more logic with the decoded information such as authorization*/
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


/** create token which is used to call other protected apis */

router.post('/login', (req, res) => {
  console.log("body: " + JSON.stringify(req.body));
  let user = { "email": req.body.email };
  res.status(200)
    .json({
      success: true,
      token: auth.createJWTToken({
        sessionData: user,//whatever data you want to encode into the session
        maxAge: 3600 // expiration time in seconds
      })
    });
});




module.exports = router;
