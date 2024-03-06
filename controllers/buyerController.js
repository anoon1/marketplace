const helper = require('../helper/helper')
const helperDB = require('../helper/helperDB')
const pool = require('../dbConfig/dbConnect');
const fs = require('fs');
const path = require('path');
module.exports.updateBuyerProfile = async (req, res) => {
    try {
        const { name, stepCheck, token, translationBox, videoCallBox, imagePlatfornmBox, stopAdvertisersBox, interactiveMediaBox, budget, about, interested_industry } = req.body;
        console.log('req.bodyreq.bodyreq.body', req.body)
        if (!token || !budget || !about) {
            return res.status(400).json({ message: 'Invalid input. Please provide all required fields.' });
        }
        let budgetRange;

        if (typeof budget === 'object' && Array.isArray(budget)) {
            budgetRange = `${budget[0]}-${budget[1]}`;
        } else {
            budgetRange = budget
        }
        console.log('budgetRabge>>>>>', budgetRange)
        const modifiedValues = {
            translation: translationBox ? 'translation' : '',
            videoCall: videoCallBox ? 'videoCall' : '',
            imagePlatform: imagePlatfornmBox ? 'imagePlatform' : '',
            stopAdvertisers: stopAdvertisersBox ? 'stopAdvertisers' : '',
            interactiveMedia: interactiveMediaBox ? 'interactiveMedia' : '',
        };

        // Remove key-value pairs with empty values
        for (const key in modifiedValues) {
            if (modifiedValues[key] === '') {
                delete modifiedValues[key];
            }
        }

        // Concatenate the remaining values into a single string
        let resultString = Object.values(modifiedValues).join(',');

        if (resultString == '') {
            resultString = interested_industry;
        }
        console.log('resultString', resultString);

        const jwtTokenExpired = await helper.jwtExpTme(token);
        if (jwtTokenExpired === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (jwtTokenExpired === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log('The token is not expired');

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole === 'buyer') {
            const updateProfile = await helperDB.updateBuyerProfile(userId, name, budgetRange, about, stepCheck, resultString);
            if (updateProfile) {
                console.log('Profile updated successfully');
                return res.status(200).json({ message: 'Profile updated successfully' });
            } else {
                console.log('Error while updating profile');
                return res.status(500).json({ message: 'Internal server error' });
            }
        } else {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
    } catch (err) {
        console.error('Error in updateBuyerProfile function', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**************************Fectch My deals*****************/
module.exports.makeDeal = async (req, res) => {
    try {
        let { offerPrice, listingId, token } = req.body;
        if (!token) {
            return res.status(403).json({ message: 'internal server error' });
        }
        if (!offerPrice) {
            return res.status(404).json({ message: 'offerPrice not provided' });
        }
        if (!listingId) {
            return res.status(404).json({ message: 'listing id not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (jwtTokenExpired === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log('The token is not expired');
        const checkUser = await helperDB.checkUserWithToken(token);

        if (checkUser != '') {
            const userId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'buyer') {
                const checkListing = await helperDB.getListingById(listingId);
                if (checkListing) {
                    let listingSellerId = checkListing.seller_id;
                    let saveDeal = await helperDB.saveDealInDb(listingId, offerPrice, userId, listingSellerId);
                    if (saveDeal != '') {
                        console.log('Deal saved sucessfully');
                        return res.status(200).json({ message: 'Deal saved successfull' });
                    } else {
                        console.log('getting error while saving deal');
                        return res.status(500).json({ message: 'internal server error' });
                    }
                }
            } else {
                return res.status(401).json({ message: 'You are not authorized' });
            }
        }
    } catch (err) {
        console.log('Error in create bid function', err)
    }
}

module.exports.getDeals = async (req, res) => {
    try {
        console.log('get deal');
        console.log('bidy datya????????????????', req.body)
        let { token, page, pageSize, searchTitle } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (jwtTokenExpired === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole === 'buyer') {
            console.log('getBuyerDealsbeforpage sned', page)
            const getDeals = await helperDB.getBuyerDeals(userId, page, pageSize, searchTitle);

            if (getDeals && getDeals.data.length > 0) {
                return res.status(200).json({ message: 'Deals fetched successfully', data: getDeals });
            } else {
                return res.status(404).json({ message: 'No deals found for the buyer', data: [] });
            }
        } else {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
    } catch (err) {
        console.error('Error in getDeals function', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/*************************Create Report***********************/
exports.reportListing = async function (req, res) {
    try {
        const { token, comment, alreadySold, fraudScam, inaccurateDescription, wrongCategory, other, listingId } = req.body;

        // if (!token || !listingId) {
        //     return res.status(400).json({ message: 'Invalid input. Please provide all required fields.' });
        // }
        console.log('req.body>>>>>>>>>>>>>', req.body)
        const checkToken = await helper.jwtExpTme(token);

        if (checkToken === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (checkToken === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            return res.status(403).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
        const modifiedValues = {
            Already_Sold: alreadySold ? 'Already Sold' : '',
            Inaccurate_Description: inaccurateDescription ? 'Inaccurate Description' : '',
            Fraud_Or_Scam: fraudScam ? 'Fraud Or Scam' : '',
            Wrong_Category: wrongCategory ? 'Wrong Category' : '',
            other: other ? 'Other' : '',
        };

        // Remove key-value pairs with empty values
        for (const key in modifiedValues) {
            if (modifiedValues[key] === '') {
                delete modifiedValues[key];
            }
        }

        // Concatenate the remaining values into a single string
        const reason = Object.values(modifiedValues).join(',');

        console.log('reasonreasonreason', reason);
        const saveReport = await helperDB.saveReportInDb(userId, comment, reason, listingId);

        if (saveReport) {
            console.log('Data saved');
            return res.status(200).json({ message: 'Report submitted successfully' });
        } else {
            console.log('Something went wrong');
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.error('Error while creating a report', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/************************Get reports*******************/
module.exports.getReportListing = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(req.body)
        let pageNo = req.body.page || 1;
        let pageSize = req.body.pageSize || 3;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const checkToken = await helper.jwtExpTme(token);

        if (checkToken === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (checkToken === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;
        console.log(userId);
        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }

        const getReports = await helperDB.getBuyerReportedListingFromDb(userId, pageNo, pageSize);
        console.log('getReportsgetReportsgetReports', getReports)
        if (getReports) {
            return res.status(200).json({ message: 'Report fetched successfully', reports: getReports });
        } else {
            return res.status(500).json({ message: 'Internal Server Error', reports: [] });
        }
    } catch (err) {
        console.error('Error in getting error report function', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.addFavouriteListing = async (req, res) => {
    try {
        console.log('This is a favorite listing function');
        const token = req.body.token;
        const listingId = req.body.listingId;

        if (!token || !listingId) {
            return res.status(400).json({ message: 'Token and listingId are required' });
        }

        const checkToken = await helper.jwtExpTme(token);

        if (checkToken === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (checkToken === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'Permission denied. User must have buyer role' });
        }
        const checkFavourite = await helperDB.checkFavouriteInDb(userId, listingId);
        console.log(checkFavourite)
        if (checkFavourite != '') {
            return res.status(200).json({ message: 'Already added to favourite' });
        }
        const saveFavouriteInDb = await helperDB.saveFavouriteListing(userId, listingId);

        if (saveFavouriteInDb) {
            console.log('Favorite added successfully');
            return res.status(200).json({ message: 'Favorite added successfully' });
        } else {
            console.log('Internal server error');
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (err) {
        console.error('Error in addFavouriteListing function', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getFavourite = async (req, res) => {
    try {
        const token = req.body.token;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const searchByName = req.body.searchByName;
        let checkSearchName = searchByName ? searchByName : '';

        const checkToken = await helper.jwtExpTme(token);

        if (checkToken === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (checkToken === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole == 'buyer') {
            let getFav = await helperDB.getFavouriteListing(userId, page, pageSize, checkSearchName);
            if (getFav) {
                console.log('fav>>>', typeof getFav)
                return res.status(200).json({ message: 'Favourite listing get sucessfully', data: getFav });
            } else {
                return res.status(200).json({ message: 'Favourite listing get sucessfully', data: [] });
            }
        } else {
            return res.status(401).json({ message: 'You are not authorized to perform this action', data: [] });
        }
    } catch (err) {
        console.log('Error while getting favourite listing', err)
    };
}

module.exports.getFavouriteForCheck = async (req, res) => {
    try {
        const token = req.body.token;
        const checkToken = await helper.jwtExpTme(token);

        if (checkToken === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        } else if (checkToken === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const userId = checkUser.id;
        const roleId = checkUser.role_id;
        console.log('userID<>>>>>>>>>>>>>', userId)
        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole == 'buyer') {
            let getFav = await helperDB.getFavouriteListingForCheck(userId);
            if (getFav) {
                console.log('fav>>>', typeof getFav)
                console.log('getFav', getFav)
                return res.status(200).json({ message: 'Favourite listing get sucessfully', data: getFav });
            } else {
                return res.status(200).json({ message: 'Favourite listing get sucessfully', data: [] });
            }
        } else {
            return res.status(401).json({ message: 'You are not authorized to perform this action', data: [] });
        }
    } catch (err) {
        console.log('Error while getting favourite listing', err)
    };
}


module.exports.removeFavouriteListing = async (req, res) => {
    try {
        console.log('this is removeFavouriteListing function');
        console.log('req.body>>>>>>>', req.body)
        let { token, listingId } = req.body;
        if (!token || !listingId) {
            return res.status(400).json({ message: 'Token and listingId are required' });
        }
        const checkToken = await helper.jwtExpTme(token);
        if (checkToken === 'expired') {
            return res.status(401).json({ message: 'Session expired! Please login again' });
        }
        else if (checkToken === 'invalidToken') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const checkUser = await helperDB.checkUserWithToken(token);
        if (!checkUser) {
            return res.status(401).json({ message: 'User not found' });
        } const userId = checkUser.id;
        const roleId = checkUser.role_id;
        const checkRole = await helperDB.userRoleCheck(roleId);
        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'Permission denied. User must have buyer role' });
        }
        const checkFavourite = await helperDB.checkFavouriteInDb(userId, listingId);
        if (checkFavourite != '') {
            const removeFavourire = await helperDB.removeFavouriteListingInDb(userId, listingId);
            if (removeFavourire != '') {
                console.log('Item removed sucessfully');
                return res.status(200).json({ message: 'Listing removed from favourite listing' });
            } else {
                return res.status(500).json({ message: 'something went wrong in removeFavouriteListingInDb function' });
            }
        } else {
            return res.status(400).json({ message: 'Listing not found in database' });
        }
    } catch (err) {
        console.log('erro while removing favourite listing', err)
    }
}

module.exports.getAllListing = async (req, res) => {
    try {
        const { token, page, pageSize, searchByName, category, price, review } = req.body
        console.log('requested Body', req.body)
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired == 'expired') {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        console.log('The token is not expired');

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
        console.log('searchByName::::::::::::::::::::::::::', searchByName)
        const getListing = await helperDB.getAllListingFromDb({ pageNo: page, pageSize, category, price, review, searchByName });
        if (getListing != '') {
            console.log('All Listing Found', getListing);
            return res.status(200).json({ message: 'All Listing found', data: getListing });
        } else {
            console.log('No listing found');
            return res.status(404).json({ message: 'All Listing not found', data: [] });
        }

    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const checkUserAuthorized = async (token) => {
    const jwtTokenExpired = await helper.jwtExpTme(token);

    if (jwtTokenExpired == 'expired') {
        console.log('The token is expired');
        return { message: 'Session Expired. Please Log In Again', error: true };
    }

    console.log('The token is not expired');

    const checkUser = await helperDB.checkUserWithToken(token);

    if (!checkUser) {
        console.log('User not found');
        return { message: 'User not found', error: true };
    }

    const roleId = checkUser.role_id;

    const checkRole = await helperDB.userRoleCheck(roleId);

    if (checkRole !== 'buyer') {
        return { message: 'You are not authorized to perform this action', error: true };
    }

    return { error: false }
}

module.exports.getSingleListing = async (req, res) => {
    try {
        const { token, list_id } = req.body

        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }
        if (!list_id) {
            return res.status(403).json({ message: 'Id not provided' });
        }

        const verify = await checkUserAuthorized(token);

        if (verify && verify.error) {
            return res.status(401).json({ message: verify.message });
        }
        const getListing = await helperDB.getSingleListingFromDb(list_id);
        if (getListing) {
            console.log('Listing Found', getListing);
            return res.status(200).json({ message: 'Listing found', data: getListing[0] });
        } else {
            console.log('No listing found');
            return res.status(404).json({ message: 'Listing not found', data: [] });
        }

    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getAllListingFilter = async (req, res) => {
    try {
        const { token, page, pageSize, category, review, price } = req.body

        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired == 'expired') {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        console.log('The token is not expired');

        const checkUser = await helperDB.checkUserWithToken(token);

        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }

        const getListing = await helperDB.getAllFilterListingFromDb(page, pageSize, category, review, price);
        if (getListing != '') {
            console.log('All Listing Found', getListing);
            return res.status(200).json({ message: 'All Listing found', data: getListing });
        } else {
            console.log('No listing found');
            return res.status(404).json({ message: 'All Listing not found', data: [] });
        }

    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getBuyersDetails = async (req, res) => {
    try {
        let { token } = req.body;
        console.log('Req.body', req.body)
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired == 'expired') {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        console.log('The token is not expired');

        const checkUser = await helperDB.checkUserWithToken(token);
        const userId = checkUser.id;
        if (!checkUser) {
            console.log('User not found');
            return res.status(403).json({ message: 'User not found' });
        }

        const roleId = checkUser.role_id;

        const checkRole = await helperDB.userRoleCheck(roleId);

        if (checkRole !== 'buyer') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        } else {
            const getUserData = await helperDB.getBuyerData(userId, roleId);
            if (getUserData) {
                console.log('data fetched sucessfullt')
                return res.status(200).json({ message: 'All details found', data: getUserData });
            } else {
                return res.status(500).json({ message: 'Internal Serevr Error', data: [] });
            }
        }
    } catch (err) {
        console.log('Error in getBuyersDetails function', err)
    }
}

/***************************Uploading buyer user documents*********************/
module.exports.uploadBuyerProfDocument = async (req, res) => {
    try {
        console.log(req.fileTypeError)
        if (req.fileTypeError) {
            return res.status(400).json({ error: req.fileTypeError });
        } else {
            const token = req.body.token;
            const docTypeData = req.body.dcType;
            console.log('docTypeDatadocTypeDatadocTypeData', docTypeData)
            let documentType = '';
            if (docTypeData) {
                console.log('This is docType', docTypeData)
                documentType = docTypeData;
            } else if (docTypeData == 'undefined') {
                documentType = ""
            }
            console.log(documentType)
            console.log('body', req.body);
            console.log(token)
            const docType = req.body.type;
            console.log('DocTdocTypedocTypeype>>>>>>>>>', docType)
            const images = req.files;
            console.log('images', images);
            if (images.length == 0) {
                console.log('Invalid images');
                return res.status(400).json({
                    status: 400,
                    message: 'Documnets required ',
                });
            }
            // Check if the user exists
            // const checkUser = 'SELECT * FROM users WHERE token = ?';
            console.log('tokentokentoken', token)
            let checkToken = await helper.jwtExpTme(token);
            console.log('checkToken>>>>', checkToken)
            if (checkToken != '') {
                console.log('Token Expired');
                return res.status(404).json({ message: 'Session Expired' })
            }
            const checkUser = await helperDB.checkUserWithToken(token);
            if (checkUser != '') {
                let userId = checkUser.id;
                console.log(userId)

                for (const image of images) {
                    const imagePath = image.path;
                    let imageSplit = imagePath.split('public/');
                    let finalimagePath = `${imageSplit[1]}`;
                    let listingId = null;
                    let checkDocType = docType ? docType : ' ';
                    console.log('DocType>>>>>>>>>', checkDocType)
                    const saveUserDocumnets = await helperDB.saveUserDocuments(userId, finalimagePath, checkDocType, listingId, documentType);
                    if (saveUserDocumnets != '') {
                        console.log('Dacument saved', imagePath)
                    } else {
                        console.log('Getting error while uploading documents')
                    }
                }
                res.status(200).json({ message: 'document uploaded successfully' });
            } else {
                res.status(403).json({ message: 'You are not alloweded to perform this action' });
            }

        }
    } catch (err) {
        console.error('Error while uploading documents', err);
        res.status(500).json({ status: 500, message: err.message });
    }
};


module.exports.getBuyerDocImages = async (req, res) => {
    try {
        console.log('getAllDocgetuments');
        console.log(req.body);

        const token = req.body.token;
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired) {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        console.log('The token is not expired');

        const checkUser = await helperDB.checkUserWithToken(token);

        if (checkUser) {
            console.log(checkUser, 'checkUser');
            const userId = checkUser.id;
            const roleId = checkUser.role_id;

            const checkRole = await helperDB.userRoleCheck(roleId);

            if (checkRole === 'buyer') {
                let getAllDocs = await helperDB.getBuyerDocumenmtImages(userId);
                return res.status(200).json({ message: 'Doc Data fetched successfully', data: getAllDocs });
            } else {
                return res.status(200).json({ message: 'No Data found', data: [] });
            }
        } else {
            return res.status(401).json({ message: 'Seller not found', data: [] });
        }
    } catch (err) {
        console.log('Error while getting admin details', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports.deleteBuyerDoc = async (req, res) => {
    try {
        console.log('getAllDocgetuments');
        console.log(req.body);

        const token = req.body.token;
        const image = req.body.img;
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired) {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        console.log('The token is not expired');

        const checkUser = await helperDB.checkUserWithToken(token);

        if (checkUser) {
            console.log(checkUser, 'checkUser');
            const userId = checkUser.id;
            const roleId = checkUser.role_id;

            const checkRole = await helperDB.userRoleCheck(roleId);

            if (checkRole === 'buyer') {
                const baseDirectory = '../public';  // Adjust this based on your project structure

                const unlinkPath = path.join(__dirname, baseDirectory, image);
                console.log('unlinkPathunlinkPath', unlinkPath);

                fs.unlink(unlinkPath, async (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error while unlinking image:', unlinkErr);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    } else {
                        console.log('Image deleted successfully');
                        let getAllDocs = await helperDB.deleteDocEntryFromDb(userId, image);

                        if (getAllDocs === '') {
                            return res.status(400).json({ message: 'Something went wrong', data: [] });
                        }

                        return res.status(200).json({ message: 'Document deleted successfully' });
                    }
                });

            } else {
                return res.status(200).json({ message: 'No Data found', data: [] });
            }
        } else {
            return res.status(401).json({ message: 'Seller not found', data: [] });
        }
    } catch (err) {
        console.log('Error while getting admin details', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.sendpayment= async (req, res) => {
    try {
        let { bidId, token } = req.body;
        console.log('req.body',req.body)
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired) {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }
        const sendPayment = await helperDB.buyerPayment(bidId);
        console.log('requestPayyment------>>>>>>>>>' , sendPayment)
        return res.status(200).json({ link:sendPayment });
    }catch(err){
        console.log('Error while getting admin details', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports.webhook= async (req, res) => {
    try{
    console.log('webhook>>>>>>>>>>>>>>>>>>>>',req.body)
    const {event , transaction_id} = req.body
    let status_input = '';
    switch (event){
        case "payment_refunded":
            status_input = "Refunded"
            //Escrow.com has refunded a buyer's payment.
        break;
        case "payment_sent":
            status_input = "Processing"
            // The buyer has sent payment to Escrow.
        break;
        case "payment_received":
            status_input = "Processing"
            // Escrow has received payment from the buyer.
        break; 
        case "complete":
            status_input = "Succeed"
            // Escrow marked the transaction as complete.
        break;
    }
   if(status_input){
    const sendPayment = await helperDB.webhookstatus(transaction_id , status_input );
    return res.status(200).json({ message: "Status updated" });
   }

    }catch(err){
        console.log('Error while getting Webhook data', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}