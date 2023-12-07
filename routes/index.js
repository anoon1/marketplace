let express = require('express');
let router = express.Router();
let sellerController = require('../controllers/sellerController');

/* GET home page. */
router.get('/', sellerController.index);
router.post('/getSellerProfile', sellerController.getSellerProfile);
module.exports = router;
