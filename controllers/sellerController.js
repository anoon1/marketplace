const { resolve } = require('path');
const sharp = require('sharp');
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

/*************************Updating user profile***************************/
module.exports.updateProfile = async (req, res) => {
    try {
        console.log('requestedData', req.body);
        let email = req.body.email;
        let name = req.body.name;
        let stepCompleted = req.body.step;
        let businessName = req.body.businessName;
        let businessType = req.body.businessType;
        let about = req.body.about;
        let description = req.body.description;
        let ssnNumber = req.body.ssnNumber;
        let profile_picture = req.body.profile_picture;
        console.log('profile_picture>>', profile_picture)
        let profilePicture = req.files;
        let finalUrl = '';
        if (profilePicture.length > 0) {
            console.log('ProfuleProfule pictureProfule pictureProfule pictureProfule picture picture', profilePicture)
            const imagePath = profilePicture[0].path;
            let imageSplit = imagePath.split('public/');
            finalUrl = `${imageSplit[1]}`;
        } else {
            finalUrl = profile_picture;
        }
        console.log('profilePictureUrlprofilePictureUrlprofilePictureUrlprofilePictureUrl', finalUrl);
        // Validate email
        if (email !== '' && email !== null) {
            let isEmailValid = await helper.isEmailValid(email)
            if (!isEmailValid) {
                console.log('Invalid email format');
                return res.status(400).json({
                    status: 400,
                    message: 'Invalid email format',
                });
            }
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Please Enter Email',
            });
        }

        // Validate other fields (e.g., name, password, interestedIn)
        if (!businessName) {
            console.log('Invalid businessName format');
            return res.status(400).json({
                status: 400,
                message: 'Please Enter business Name',
            });
        }

        if (!businessType) {
            console.log('Invalid business type format');
            return res.status(400).json({
                status: 400,
                message: 'Please Select business type ',
            });
        }
        if (!description) {
            console.log('Invalid business type format');
            return res.status(400).json({
                status: 400,
                message: 'Please enter  description ',
            });
        }
        const checkUser = await helperDB.checkUserInDb(email);
        if (checkUser != '') {
            console.log('checkUser', checkUser)
            let token = checkUser.token;
            let checkToken = await helper.jwtExpTme(token);

            if (checkToken != '') {
                console.log('Token Expired');
                return res.status(404).json({ message: 'Session Expired' })
            }
            let userEmail = checkUser.email;
            let roleId = checkUser.role_id;
            console.log('role id', roleId)
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const updateUSerProfile = await helperDB.updateProfile(name, businessName, businessType, description, about, userEmail, finalUrl, ssnNumber, stepCompleted)
                if (updateUSerProfile != '') {
                    console.log('User updated sucessfully', updateUSerProfile);
                    res.status(200).json({ message: 'Profile updated successfully' });
                } else {
                    console.log('Error while  user in the database')
                }
            } else {
                console.log('User is type of ', checkRole)
                res.status(401).json({ message: 'You are not alloweded to perform' });
            }


        } else {
            console.log('No USer Found')
        }
    } catch (err) {
        console.log('Error in update profile function', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/***************************Uploading user documents*********************/
module.exports.uploadDocument = async (req, res) => {
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
                    let checkDocType = docType?.docType ?? ' ';
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

/***************************Creating extension listing********************/
const path = require('path');
const fs = require('fs');

const createThumbnail = ({ thumbnailPath, thumbnailWidth, thumbnailHeight, thumbnailDestinationPath, thumbnailFileName }) => {
    return new Promise(async (resolve, reject) => {
        // Use sharp to resize and save the thumbnail
        await sharp(thumbnailPath)
            .resize(thumbnailWidth, thumbnailHeight)
            .toFile(thumbnailDestinationPath, async (err, info) => {
                if (err) {
                    console.error('Error creating thumbnail:', err);
                    // Handle the error appropriately
                    resolve('')
                } else {
                    let thumbnailURL = `images/uploads/extThumbnailCopy/${thumbnailFileName}`;
                    console.log('Thumbnail created successfully:', info);
                    resolve(thumbnailURL)
                }
            });

    })
}
module.exports.createListing = async (req, res) => {
    // console.log(err)
    try {
        console.log(req.body)
        const { description, sellingReason, askingPrice, industryType, netProfit, version, businessModel, rating, revenue, link, downloads, token, title } = req.body;
        const images = req.files.uploadFile;
        console.log('Thumbnailimages>>>>', req.files);
        const thumbnailImage = req.files.listingTumbnail;
        const thumbnailImageData = thumbnailImage ? thumbnailImage : '';
        console.log('thumbnail>>>>>>>>>>>', thumbnailImageData)
        const thumbnailPath = thumbnailImageData[0]?.path;
        let thumbnailURL = '';
        let thumbnailFinalPath = '';
        if (thumbnailPath) {
            const thumbnailWidth = 100; // Adjust the width as needed
            const thumbnailHeight = 100; // Adjust the height as needed

            // Create a unique filename for the thumbnail
            const thumbnailFileName = `thumbnail_${Date.now()}.jpg`;

            // Specify the destination path for the thumbnail
            const thumbnailDestinationPath = path.join(__dirname, '../', 'public', 'images', 'uploads', 'extThumbnailCopy', thumbnailFileName);
            console.log('thumbnailDestinationPath', thumbnailDestinationPath)

            thumbnailURL = await createThumbnail({
                thumbnailPath,
                thumbnailWidth,
                thumbnailHeight,
                thumbnailDestinationPath,
                thumbnailFileName
            })

            console.log('thumbnailPath ::::::::::::::::::::::', thumbnailPath)
            const thumbnailOrgPath = thumbnailPath.split('public/');
            console.log(thumbnailOrgPath);
            thumbnailFinalPath = `${thumbnailOrgPath[1]}`;
            console.log('images>>>>', images)
        }
        console.log('thumbnailURL ::::::::::::::::::::::', thumbnailURL)
        console.log('thumbnailFinalPath', thumbnailFinalPath);

        let listingDoc = req.files.uploadDocfile;
        let errors = {};

        if (!token) {
            errors.token = '• Token is required';
        }
        if (!title) {
            errors.title = '• Title is required'
        }

        if (!description) {
            errors.description = '• Description is required'
        }
        if (!sellingReason) {
            errors.sellingReason = '• Selling reason is required'
        }
        if (!askingPrice) {
            errors.askingPrice = '• Asking price is required'
        }


        if (!businessModel) {
            errors.businessModel = '• Business model is required'
        }
        if (!netProfit) {
            errors.netProfit = '• Net profit is required'
        }
        if (!revenue) {
            errors.revenue = '• Revenue is required'
        }

        // if (images.length == 0) {
        //     errors.images = '• Images are required'
        // }
        const jwtTokenExpired = await helper.jwtExpTme(token);
        //check token expired or not
        if (jwtTokenExpired == 'expired') {
            console.log('The token is expired');
            errors.session = 'Session Expired. Please Log In Again';
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                status: 400,
                errors: errors,
            });
        } else {
            const checkUser = await helperDB.checkUserWithToken(token);
            if (checkUser != '') {
                let roleId = checkUser.role_id;
                let userId = checkUser.id;
                console.log('role id', roleId)
                let checkRole = await helperDB.userRoleCheck(roleId)
                console.log('finalimagesPath :::::::::::::', images)

                const imagePath = images ? images.map(image => {
                    let pathImg = image.path.split('public/');
                    const finalPath = `${pathImg[1]}`;
                    console.log('finalPath :::::::::::::', finalPath)
                    return finalPath;
                }).join(',') : '';
                if (checkRole == 'seller') {
                    let listingData = {
                        description,
                        sellingReason,
                        askingPrice,
                        industryType,
                        netProfit,
                        version,
                        businessModel,
                        revenue,
                        link,
                        downloads: downloads === "" ? 0 : Number(downloads),
                        token,
                        title,
                        userId,
                        rating,
                        imagePath,
                        thumbnailFinalPath,
                        thumbnailURL: thumbnailURL,

                    }
                    console.log(listingData)
                    console.log(typeof listingData.downloads)
                    const createListing = await helperDB.createListing(listingData);
                    // const createListing = '';
                    if (createListing != '') {
                        console.log('Listing create done', createListing)
                        let listingId = createListing;
                        if (listingDoc && listingDoc!==null && listingDoc!=='null') {
                            for (const image of listingDoc) {
                                const docImagePath = image.path;
                                const orgPath = docImagePath.split('public/');
                                console.log(orgPath);
                                const finalPath = `${orgPath[1]}`;
                                console.log('finalPath', finalPath)
                                const docType = "listing";
                                const documentType = '';
                                const saveUserDocumnets = await helperDB.saveUserDocuments(userId, finalPath, docType, listingId, documentType);
                                if (saveUserDocumnets != '') {
                                    console.log('Dacument saved', imagePath)
                                } else {
                                    console.log('Getting error while uploading documents')
                                }
                            }
                        } else {
                            console.log('No listing doc found')
                        }
                        return res.status(200).json({ message: 'Listing created successfully and documets saved' });

                    } else {
                        return res.status(200).json({ message: 'Listing created successfully' });
                    }
                } else {
                    res.status(401).json({ message: 'You are not allowed to perform this action' });
                }
            } else {
                // User does not exist
                console.log('User not exist')
            }
        }
    }
    catch (err) {
        console.error('Error in create listing controller', err);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

/*******************************update listing**********************/

module.exports.updateListing = async (req, res) => {
    // console.log(err)
    try {
        console.log('requested body>>>>>>>>>>>>',req.body)
        const { how_it_works, document, listing_image, listing_thumbnail, id, description, selling_reason, asking_price, industry_type, net_profit, version, business_model, rating, revenue, link, downloads, token, title } = req.body;
        const images = req.files.how_it_works;
        let docFile = req.files.document;
        console.log('Doc files>>>>>>>>', docFile);
        console.log('Thumbnailimages>>>>', req.files);
        const thumbnailImage = req.files.listingTumbnail;
        const thumbnailImageData = thumbnailImage ? thumbnailImage : '';
        console.log('thumbnail>>>>>>>>>>>', thumbnailImageData)
        // const thumbnailPath = thumbnailImageData[0].path;
        const thumbnailPath = thumbnailImageData?.[0]?.path;
        console.log('thumbnailPaththumbnailPath', thumbnailPath)
        let thumbnailURL = '';
        let thumbnailFinalPath;
        let documentData;
        if(docFile!==undefined){
            documentData=docFile;
        }else{
            documentData=docFile;
        }
        // const docUrl = docFile ? docFile.map(image => {
        //     console.log('we are here>>>>>>>>>>>>>>>>>>>');
        //     let pathImg = image.path.split('public/');
        //     const finalPath = `${pathImg[1]}`;
        //     console.log('finalPath :::::::::::::', finalPath)
        //     return finalPath;
        // }).join(',') : document;

        console.log('documentData>>>>>>>>>>>>>>>', documentData)
        if (thumbnailPath) {
            const thumbnailWidth = 100; // Adjust the width as needed
            const thumbnailHeight = 100; // Adjust the height as needed

            // Create a unique filename for the thumbnail
            const thumbnailFileName = `thumbnail_${Date.now()}.jpg`;

            // Specify the destination path for the thumbnail
            const thumbnailDestinationPath = path.join(__dirname, '../', 'public', 'images', 'uploads', 'extThumbnailCopy', thumbnailFileName);
            console.log('thumbnailDestinationPath', thumbnailDestinationPath)

            thumbnailURL = await createThumbnail({
                thumbnailPath,
                thumbnailWidth,
                thumbnailHeight,
                thumbnailDestinationPath,
                thumbnailFileName
            })
            console.log('thumbnailPath ::::::::::::::::::::::', thumbnailPath)
            const thumbnailOrgPath = thumbnailPath.split('public/');
            console.log(thumbnailOrgPath);
            thumbnailFinalPath = `${thumbnailOrgPath[1]}`;
            console.log('images>>>>', images)
        } else {
            thumbnailFinalPath = listing_image;
            thumbnailURL = listing_thumbnail;
        }
        console.log('thumbnailFinalPath', thumbnailFinalPath);
        console.log('thumbnailURL ::::::::::::::::::::::', thumbnailURL)

        // let listingDoc = req.files.uploadDocfile;
        let errors = {};

        if (!token) {
            errors.token = '• Token is required';
        }
        if (!title) {
            errors.title = '• Title is required'
        }

        if (!description) {
            errors.description = '• Description is required'
        }
        if (!selling_reason) {
            errors.sellingReason = '• Selling reason is required'
        }
        if (!asking_price) {
            errors.askingPrice = '• Asking price is required'
        }


        if (!business_model) {
            errors.businessModel = '• Business model is required'
        }
        if (!net_profit) {
            errors.netProfit = '• Net profit is required'
        }
        if (!revenue) {
            errors.revenue = '• Revenue is required'
        }

        // if (images.length == 0) {
        //     errors.images = '• Images are required'
        // }
        const jwtTokenExpired = await helper.jwtExpTme(token);
        //check token expired or not
        if (jwtTokenExpired == 'expired') {
            console.log('The token is expired');
            errors.session = 'Session Expired. Please Log In Again';
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                status: 400,
                errors: errors,
            });
        } else {
            const checkUser = await helperDB.checkUserWithToken(token);
            if (checkUser != '') {
                let roleId = checkUser.role_id;
                let userId = checkUser.id;
                console.log('role id', roleId)
                let checkRole = await helperDB.userRoleCheck(roleId)
                console.log('finalimagesPath :::::::::::::', images)

                const imagePath = images ? images.map(image => {
                    let pathImg = image.path.split('public/');
                    const finalPath = `${pathImg[1]}`;
                    console.log('finalPath :::::::::::::', finalPath)
                    return finalPath;
                }).join(',') : how_it_works;
                if (checkRole == 'seller') {
                    let listingData = {
                        id,
                        description,
                        selling_reason,
                        asking_price,
                        industry_type,
                        net_profit,
                        version,
                        business_model,
                        revenue,
                        link,
                        downloads: downloads === "" ? 0 : Number(downloads),
                        token,
                        title,
                        userId,
                        rating,
                        imagePath,
                        thumbnailFinalPath,
                        thumbnailURL: thumbnailURL,

                    }
                    console.log(listingData)
                    console.log(typeof listingData.downloads)
                    const updateListing = await helperDB.updateListing(listingData);
                    // const createListing = '';
                    if (documentData != '' && documentData != null && documentData != 'null') {
                        for (const image of documentData) {
                            const docImagePath = image.path;
                            let listingId=updateListing;
                            const orgPath = docImagePath.split('public/');
                            console.log(orgPath);
                            const finalPath = `${orgPath[1]}`;
                            console.log('finalPath', finalPath)
                            const docType = "listing";
                            const documentType = '';
                            const saveUserDocumnets = await helperDB.saveUserDocuments(userId, finalPath, docType, listingId, documentType);
                            if (saveUserDocumnets != '') {
                                console.log('Dacument saved', imagePath)
                            } else {
                                console.log('Getting error while uploading documents')
                            }
                        }

                        return res.status(200).json({ message: 'Listing and documents updated successfully' });

                    } else {
                        return res.status(200).json({ message: 'Listing created successfully' });

                    }
                } else {
                    res.status(401).json({ message: 'You are not allowed to perform this action' });
                }
            } else {
                // User does not exist
                console.log('User not exist')
            }
        }
    }
    catch (err) {
        console.error('Error in create listing controller', err);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};


/********************Getting the listing user based************************/
module.exports.getListing = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(req.body)
        let pageNo = req.body.page;
        let pageSize = req.body.pageSize;
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
            const userId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const getListing = await helperDB.getListingFromDb(userId, pageNo, pageSize);
                if (getListing != '') {
                    console.log('Listing Found', getListing);
                    return res.status(200).json({ message: 'Listing found', data: getListing });
                } else {
                    console.log('No listing found');
                    return res.status(404).json({ message: 'Listing not found' });
                }

            } else {
                console.log('User is type of', checkRole);
                return res.status(401).json({ message: 'You are not allowed to perform this action' });
            }
        } else {
            console.log('User not found');
            return res.status(403).json({ message: 'You are not allowed to perform this action' });
        }
    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


/********************Getting the user bid  ************************/
module.exports.getSellerBid = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(req.body)
        let pageNo = req.body.page;
        let status = req.body.getStatus;
        console.log('status',status)
        let pageSize = req.body.pageSize;
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
            const userId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const getListing = await helperDB.getBidBySellerId(userId, pageNo, pageSize,status);
                if (getListing != '') {
                    console.log('bid Found', getListing);
                    return res.status(200).json({ message: 'bid found', data: getListing });
                } else {
                    console.log('No listing found');
                    return res.status(404).json({ message: 'bid not found' ,data:[]});
                }

            } else {
                console.log('User is type of', checkRole);
                return res.status(401).json({ message: 'You are not allowed to perform this action' });
            }
        } else {
            console.log('User not found');
            return res.status(403).json({ message: 'You are not allowed to perform this action' });
        }
    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/********************** Update bid status ***********************/
module.exports.updateBidStatus = async (req, res) => {
    try {
        console.log('req.bodyData', req.body);
        let { status, reason, bidId, token } = req.body;
        console.log('token fetched successfully');
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
            const userId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                let checkReason = reason ? reason : '';
                const getListing = await helperDB.changeStatusOfBid(bidId, status, userId,checkReason);
                if (getListing != '') {
                    console.log('Data found', getListing);
                    res.status(200).json({ message: 'Data fetched sucessfully' })
                } else {
                    res.status(500).json({ message: 'Internal Server Error' })
                }
            } else {
                return res.status(401), json({ message: 'You are not authorized' })
            }
        }

    } catch (err) {
        console.log('Error in updateBidStatus function');
    }


}


/*****************************Get seller profile all detailsgetSellerProfile*********/
module.exports.getSellerProfileData = async (req, res) => {
    try {
        console.log('getSellerProfileData')
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
            console.log(checkUser, 'checkUser')
            let userId = checkUser.id;
            // console.log('userId', userId)
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const checkUserListingDetails = await helperDB.getListingBySellerId(userId);
                console.log('checkUserListingDetailscheckUserListingDetails', checkUserListingDetails)
                if (checkUserListingDetails != '') {
                    console.log('checkUserListingDetails', checkUserListingDetails);
                    const totalListings = checkUserListingDetails.length;
                    const approvedListings = checkUserListingDetails.filter(listing => listing.status === 1).length;
                    const pendingListings = checkUserListingDetails.filter(listing => listing.status === 2).length;
                    const rejectedListings = checkUserListingDetails.filter(listing => listing.status === 3).length;

                    res.status(200).json({
                        message: "Seller found",
                        data: {
                            totalListings,
                            approvedListings,
                            pendingListings,
                            checkRole,
                            checkUser,
                            rejectedListings
                        }
                    });
                } else {
                    console.log('listing data is not found');
                    const defaultListingsData = {
                        totalListings: 0,
                        approvedListings: 0,
                        pendingListings: 0,
                        rejectedListings: 0,
                    };
                    const data = {
                        ...defaultListingsData,
                        checkRole,
                        checkUser,
                    }
                    console.log('Data', data)
                    return res.status(200).json({
                        message: 'Seller not found',
                        data: {
                            ...defaultListingsData,
                            checkRole,
                            checkUser,
                        },
                    });
                }
            } else {
                return res.status(401).json({
                    message: 'Seller not found',
                    data: [],
                });
            }


        } else {
            console.log('User not found')
        }
    } catch (err) {
        console.log('Error while getting seller all detils', err)
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
            console.log(checkUser, 'checkUser')
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                console.log('Seller found', checkUser);
                res.status(200).json({ message: "Seller found", data: checkUser })
            } else {
                console.log('Seller Not found', userResult);
                return res.status(401).json({ message: 'Seller not found' });

            }
        };
    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getSellerListingDeals = async (req, res) => {
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
            const sellerId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const getDeals = await helperDB.getSellerListing(sellerId);
                if (getDeals) {
                    return res.status(200).json({ message: "Bid fetched sucessfully", data: getDeals });
                } else {
                    return res.status(500).json({ message: "Internal server error" });
                }
            } else {
                return res.status(401).json({ message: "You are not authorized" })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateDealStatus = async (req, res) => {
    try {
        let { token, status, listingId } = req.body;
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }
        if (!status) {
            return res.status(403).json({ message: 'status not provided' });
        }
        if (!listingId) {
            return res.status(403).json({ message: 'listingId not provided' });
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
            const sellerId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                let changeStatus = await helperDB.changeStatusOfBid(sellerId, status, listingId);
                if (changeStatus) {
                    return res.status(200).json({ message: 'Status changed' });
                } else {
                    return res.status(500).json({ message: "Internal server error" });
                }
            } else {
                return res.status(401).json({ message: "You are not authorized" })
            }
        }
    } catch (err) {
        console.log('Error while changing bid status')
    }
}


module.exports.getReportedListing = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(req.body)
        let pageNo = req.body.page || 1;
        let pageSize = req.body.pageSize || 3;
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
            const userId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const getListing = await helperDB.getReportedListingFromDb(userId, pageNo, pageSize);
                if (getListing) {
                    console.log('Listing found', getListing)
                    return res.status(200).json({ message: 'listing found', data: getListing });
                } else {
                    console.log('No listing found');
                    return res.statue(400).json({ message: 'No listing found' });
                }
            } else {
                console.log('Not authorized                                                                                                             ');
                return res.status(401).json({ message: "You are not authorized" })
            }
        }
    } catch (err) {
        console.log('getting error in reportedLising', err);
    }
}

module.exports.deleteSelectedListing = async (req, res) => {
    try {
        const token = req.body.token;
        const itemId = req.body.itemId;
        console.log(req.body)
        console.log(itemId)
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
            const sellerId = checkUser.id;
            const roleId = checkUser.role_id;
            let checkRole = await helperDB.userRoleCheck(roleId)
            if (checkRole == 'seller') {
                const deleteListing = await helperDB.deleteListingWithId(itemId, sellerId);
                if (deleteListing == 'deleted') {
                    res.status(200).json({ message: "done" });
                } else {
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        }

    } catch (err) {
        console.log('getting error in reportedLising', err);
    }
}

module.exports.deleteSellerDoc = async (req, res) => {
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

            if (checkRole === 'seller') {
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

module.exports.requestPayment = async (req, res) => {
    try {
        let { bidId, token } = req.body;
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        const jwtTokenExpired = await helper.jwtExpTme(token);

        if (jwtTokenExpired) {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }
        console.log('jwtTokenExpired---------------------------------------------------------------------------',jwtTokenExpired)
        const requestPayyment = await helperDB.sellerPayment(bidId);
        console.log('requestPayyment------>>>>>>>>>' , requestPayyment)
        return res.status(200).json({ link:requestPayyment });

    }
    catch (err) {
        console.log('Error while getting admin details', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.webhook = async (req, res) => {
    try {
        console.log('webhoook------------------data------',rwq.body)
        return res.status(200);

    }
    catch (err) {
        console.log('Error while getting admin details', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};