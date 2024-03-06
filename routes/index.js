let express = require('express');
let router = express.Router();
let sellerController = require('../controllers/sellerController');
let buyerController = require('../controllers/buyerController');
let adminController = require('../controllers/adminController');
let chatController = require('../controllers/chatController');
let homeController = require('../controllers/homeController');
const multer = require('multer');

/*************user documents saving path******************/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.fieldname == "uploadFile" || file.fieldname == "how_it_works") {

      cb(null, 'public/images/uploads/extensionDoc');

    } else if (file.fieldname == "uploadDocfile" || file.fieldname == "buyerProfDoc" || file.fieldname == "document") {

      cb(null, 'public/images/uploads/userDocs');

    } else if (file.fieldname == "listingTumbnail" || file.fieldname == "listing_image") {

      console.log('thumbnail file', file)
      cb(null, 'public/images/uploads/extThumbnails');

    } else if (file.fieldname == "profileBusinessDoc" || file.fieldname == "userIdentityVerification") {

      cb(null, 'public/images/uploads/userProfileDoc');

    } else if (file.fieldname == "profile_picture") {

      cb(null, 'public/images/uploads/profilePicture');

    } else if (file.fieldname == "admin_profile_picture") {

      cb(null, 'public/images/uploads/adminProfile');

    }
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    const timestamp = Date.now();
    cb(null, timestamp + '.' + extension);
  },
});


/***********************Add check document type before saving************/
const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
const thumbnailAllowedFileTypes = ['image/jpeg', 'image/png'];
const videoAllowedTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/mpeg',
  'video/avi',
];

const fileFilter = (req, file, callback) => {
  try {

    console.log('file>>>>>>>>>>>>>>', file);

    if (file.fieldname === 'uploadDocfile' || file.fieldname === 'document' || file.fieldname === 'buyerProfDoc' || file.fieldname === 'profileBusinessDoc' || file.fieldname === 'userIdentityVerification') {
      if (allowedFileTypes.includes(file.mimetype)) {

        callback(null, true);
      } else {

        callback(new Error('Invalid file format Only JPEG, PNG, PDF, and DOC are allowed.'), false);
      }
    } else if (file.fieldname === 'listingTumbnail' || file.fieldname === 'admin_profile_picture' || file.fieldname === 'profile_picture') {
      if (thumbnailAllowedFileTypes.includes(file.mimetype)) {

        callback(null, true);
      } else {

        callback(new Error('Invalid file format Only JPEG, PNG are allowed.'), false);
      }
    } else if (file.fieldname === 'how_it_works' || file.fieldname === 'uploadFile') {
      if (videoAllowedTypes.includes(file.mimetype)) {

        callback(null, true);
      } else {

        callback(new Error('Invalid file format Only mp4, webm ,ogg ,mpeg and avi are allowed.'), false);
      }
    } else {
      callback(null, true);
    }

  } catch (err) {
    console.log(err);
  }
};


const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
});


router.post('/uploadDocument', uploads.array('profileBusinessDoc'), sellerController.uploadDocument);
router.post('/userVerificationDoc', uploads.array('userIdentityVerification'), sellerController.uploadDocument);
router.post('/updateProfile', uploads.array('profile_picture'), sellerController.updateProfile);

router.post('/createListing', uploads.fields([
  { name: 'uploadFile' },
  { name: 'uploadDocfile' },
  { name: 'listingTumbnail' },
]), sellerController.createListing);

router.post('/updateListing',
  uploads.fields([
    { name: 'how_it_works' },
    { name: 'listingTumbnail' },
    { name: 'document' },
  ]),
  sellerController.updateListing);
/************************seller routes************/
router.post('/getListing', sellerController.getListing);
router.post('/getSellerProfile', sellerController.getSellerProfile);
router.post('/getSellerListingDeals', sellerController.getSellerListingDeals);
router.post('/getReportedListing', sellerController.getReportedListing);
router.post('/updateDealStatus', sellerController.updateDealStatus);
router.post('/getSellerProfileData', sellerController.getSellerProfileData);
router.post('/deleteSelectedListing', sellerController.deleteSelectedListing);
router.post('/getSellerBid', sellerController.getSellerBid);
router.post('/deleteSellerDoc', sellerController.deleteSellerDoc);
router.post('/updateBidStatus', sellerController.updateBidStatus);
router.post('/acceptpayment', sellerController.requestPayment);
router.post('/sandbox-webhook', sellerController.webhook);
/********************Buyers routes**************/
router.post('/getBuyersDetails', buyerController.getBuyersDetails);
router.post('/getAllListing', buyerController.getAllListing);
router.post('/getSingleListing', buyerController.getSingleListing);
router.post('/updateBuyerProfile', buyerController.updateBuyerProfile);
router.post('/makeDeal', buyerController.makeDeal);
router.post('/getDeals', buyerController.getDeals);
router.post('/reportListing', buyerController.reportListing);
router.post('/getBuyerReportListing', buyerController.getReportListing);
router.post('/addFavouriteListing', buyerController.addFavouriteListing);
router.post('/getFavourite', buyerController.getFavourite);
router.post('/getFavouriteForCheck', buyerController.getFavouriteForCheck);
router.post('/removeFavouriteListing', buyerController.removeFavouriteListing);
router.post('/uploadBuyerProfDocument', uploads.array('buyerProfDoc'), buyerController.uploadBuyerProfDocument);
router.post('/deleteBuyerDoc', uploads.array('buyerProfDoc'), buyerController.deleteBuyerDoc);
router.post('/getBuyerDocImages', buyerController.getBuyerDocImages);
router.post('/sendpayment', buyerController.sendpayment);
router.post('/webhook', buyerController.webhook);

/********************Admin routes****************************/
router.post('/getAllCreatedListing', adminController.getAllCreatedListing);
router.post('/updateListingStatus', adminController.updateListingStatus);
router.post('/getAllBuyersDeals', adminController.getAllBuyersDeals);
router.post('/getAdminReportListing', adminController.getAdminReportListing);
router.post('/getAdminProfile', adminController.getAdminProfile);
router.post('/getAllDocuments', adminController.getAllDocuments);
router.post('/getUserDocImages', adminController.getUserDocImages);
router.post('/updateDocgStatus', adminController.updateDocgStatus);
router.post('/getSellerDocImages', adminController.getSellerDocImages);
router.post('/getAllListingData', adminController.getAllListingData);
router.post('/getAdminProfile', adminController.getAdminProfile);
router.post('/updateAdminProfile', uploads.array('admin_profile_picture'), adminController.updateAdminProfile);

/********************Chat controller*************************/
router.post('/checkUserRoom', chatController.checkUserRoom);
router.post('/getUserRooms', chatController.getUserRooms);
router.post('/getToUserRooms', chatController.getToUserRooms);
router.post('/saveMessageInDatabase', chatController.saveMessageInDatabase);
router.post('/getUserOldMessages', chatController.getUserOldMessages);
router.post('/searchChatByName', chatController.searchChatByName);
router.post('/searchChatByNameSeller', chatController.searchChatByNameSeller);
router.post('/reporChat', chatController.reporChat);

/********************Home controller*********************/
router.post('/getLatestListing', homeController.getLatestListing);
module.exports = router;
