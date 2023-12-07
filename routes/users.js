let express = require('express');
let router = express.Router();
let userAuthenticate=require('../controllers/userAuthentication')

 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signUp', userAuthenticate.signUpUser);
router.post('/signIn', userAuthenticate.signInUser);
router.post('/forgetPassword', userAuthenticate.forgetPassword);
router.post('/verifyOtp', userAuthenticate.verifyOtp);
router.post('/changePassword', userAuthenticate.changePassword);

module.exports = router;
 