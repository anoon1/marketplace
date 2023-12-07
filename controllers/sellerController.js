const { resolve } = require('path');
const pool = require('../dbConfig/dbConnect');
const helper = require('../helper/helper')
const { rejects } = require('assert');
const helperDB = require('../helper/helperDB')
/*************************Default Route for index**********************/
module.exports.index = async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error('Error rendering:', error);
        res.status(500).send('Internal Server Error');
    }
}

/*************************Getting seller profile*************************/
module.exports.getSellerProfile = async (req, res) => {
    try {
        console.log(req.body);
        const token = req.body.token;

        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired == 'expired') {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        console.log('The token is not expired');

      // Verify user and get user ID
      const checkUser = await helperDB.checkUserWithToken(token);

      if (checkUser != '') {
          const roleId = checkUser[0].role_id;
          let checkRole = await helperDB.userRoleCheck(roleId)
          if (checkRole == 'seller') {
                console.log('Seller found', checkUser);
                res.status(200).json({ message: "Seller found", data: checkUser })
            } else {
                console.log('Seller Not found', userResult);
                return res.status(403).json({ message: 'Seller not found' });
                
            }
        };
    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

