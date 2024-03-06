const helper = require('../helper/helper')
const helperDB = require('../helper/helperDB')

module.exports.getAllCreatedListing = async (req, res) => {
    try {
        console.log('req.bodyData', req.body);
        let { token, page, getStatus, pageSize } = req.body;
        console.log('token fetched successfully');
        console.log('pageNopageNopageNopageNo', page)
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
            if (checkRole == 'admin') {
                const getListing = await helperDB.getCreatedListing(page, getStatus, pageSize);
                if (getListing != '') {
                    console.log('Data found', getListing);
                    res.status(200).json({ message: 'Data fetched sucessfully', data: getListing })
                }
            } else {
                return res.status(401), json({ message: 'You are not authorized', data: [] })
            }
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function', err);
    }
}

module.exports.updateListingStatus = async (req, res) => {
    try {
        console.log('req.bodyData', req.body);
        let { status, reason, listingId, token } = req.body;
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
            if (checkRole == 'admin') {
                let checkReason = reason ? reason : '';
                const getListing = await helperDB.updateListingStatusInDb(listingId, status, checkReason);
                if (getListing != '') {
                    console.log('Data updated', getListing);
                    res.status(200).json({ message: 'Data fetched sucessfully' })
                } else {
                    res.status(500).json({ message: 'Internal Server Error' })
                }
            } else {
                return res.status(401), json({ message: 'You are not authorized' })
            }
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function');
    }


}

module.exports.getAllBuyersDeals = async (req, res) => {
    try {
        console.log('req.bodyData', req.body);
        let { token, page, pageSize } = req.body;
        console.log('token fetched successfully');
        console.log('pageNopageNopageNopageNo', page)
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
            if (checkRole == 'admin') {
                const getListing = await helperDB.getAdminBuyerDeals(userId, page, pageSize);
                if (getListing != '') {
                    console.log('Data found', getListing);
                    res.status(200).json({ message: 'Data fetched sucessfully', data: getListing })
                }
            } else {
                return res.status(401), json({ message: 'You are not authorized', data: [] })
            }
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function', err);
    }
}

module.exports.getAdminReportListing = async (req, res) => {
    try {
        console.log('req.bodyData', req.body);
        let { token, page, pageSize } = req.body;
        console.log('token fetched successfully');
        console.log('pageNopageNopageNopageNo', page)
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
            if (checkRole == 'admin') {
                const getListing = await helperDB.getAdminReportsListing(page, pageSize);
                if (getListing != '') {
                    console.log('Data found', getListing);
                    res.status(200).json({ message: 'Data fetched sucessfully', data: getListing })
                } else {
                    console.log('No Data found', getListing);
                    res.status(404).json({ message: 'No Data Found', data: [] })
                }
            } else {
                return res.status(401).json({ message: 'You are not authorized', data: [] })
            }
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function', err);
    }
}



module.exports.getAdminProfile = async (req, res) => {
    try {
        console.log('getAdminProfile');
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

            if (checkRole === 'admin') {
                return res.status(200).json({ message: 'Data fetched successfully', data: checkUser });
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

module.exports.getAllDocuments = async (req, res) => {
    try {
        console.log('getAllDocuments');
        console.log(req.body);

        const token = req.body.token;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
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

            if (checkRole === 'admin') {
                let getAllDocs = await helperDB.getUserDocs(page, pageSize);
                return res.status(200).json({ message: 'Data fetched successfully', data: getAllDocs });
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


module.exports.getUserDocImages = async (req, res) => {
    try {
        console.log('getUserDocImages');
        console.log(req.body);

        const token = req.body.token;
        const user_id = req.body.user_id;
        let listing_id = req.body.listingId
        console.log('user_iduser_iduser_id', user_id, 'listing_idlisting_id', listing_id)
        // const listingId = req.body.listingId;
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

            if (checkRole === 'admin') {
                let checkListingId = listing_id ?? '';
                let getAllDocs = await helperDB.getBuyerDocumenmtImages(user_id, checkListingId);
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


module.exports.getSellerDocImages = async (req, res) => {
    try {
        console.log('getAllDocgetuments');
        console.log(req.body);

        const token = req.body.token;
        const listingId = req.body.listingId;
        const seller_id = req.body.seller_id;
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

            if (checkRole === 'admin') {
                let getAllDocs = await helperDB.getSellerDocumenmtImages(seller_id, listingId);
                console.log('getAllDocsgetAllDocs', getAllDocs)
                return res.status(200).json({ message: 'Data fetched successfully', data: getAllDocs });
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


module.exports.updateDocgStatus = async (req, res) => {
    try {
        console.log('req.bodyData', req.body);
        let { status, reason, id, token } = req.body;
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
            if (checkRole == 'admin') {
                let checkReason = reason ? reason : '';
                const updateStatus = await helperDB.updateDocStatusInDb(id, status, checkReason);
                if (updateStatus != '') {
                    console.log('Status Updated Sucessfully', updateStatus);
                    res.status(200).json({ message: 'Status Updated Sucessfully' })
                } else {
                    res.status(500).json({ message: 'Internal Server Error' })
                }
            } else {
                return res.status(401), json({ message: 'You are not authorized' })
            }
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function');
    }

}

module.exports.getAdminProfile = async (req, res) => {
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
            if (checkRole == 'admin') {
                console.log('Admin found', checkUser);
                res.status(200).json({ message: "Admin found", data: checkUser })
            } else {
                console.log('Admin Not found', userResult);
                return res.status(401).json({ message: 'Admin not found' });

            }
        };
    } catch (err) {
        console.log('Error while getting listing', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.updateAdminProfile = async (req, res) => {
    try {
        console.log('requestedData', req.body);
        let email = req.body.email;
        let name = req.body.name;
        let description = req.body.description;
        let profilePicture_old = req.body.profilePicture_old;
        let profile_picture = req.files;
        console.log('profile_picture>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', profile_picture);
        let finalUrl = '';
        if (profile_picture !== undefined && profile_picture !== 'undefined') {
            if (profile_picture.length > 0) {
                console.log('ProfuleProfule pictureProfule pictureProfule pictureProfule picture picture', profile_picture)
                const imagePath = profile_picture[0].path;
                let imageSplit = imagePath.split('public/');
                finalUrl = `${imageSplit[1]}`;
            } else {
                finalUrl = profilePicture_old;
            }
        } else {
            finalUrl = profilePicture_old;
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

        if (!description) {
            console.log('Description is required');
            return res.status(400).json({
                status: 400,
                message: 'Please enter  description ',
            });
        }

        if (!name) {
            console.log('Name is required');
            return res.status(400).json({
                status: 400,
                message: 'Please enter  Name ',
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
            if (checkRole == 'admin') {
                const updateUSerProfile = await helperDB.updateAdminProfile(name, description, userEmail, finalUrl)
                if (updateUSerProfile != '') {
                    console.log('Admin updated sucessfully', updateUSerProfile);
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


/*****************************Get seller profile all detailsgetSellerProfile*********/
module.exports.getAllListingData = async (req, res) => {
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
            if (checkRole == 'admin') {
                const checkUserListingDetails = await helperDB.getAllListing();
                console.log('checkUserListingDetailscheckUserListingDetails', checkUserListingDetails)
                if (checkUserListingDetails != '') {
                    console.log('checkUserListingDetails', checkUserListingDetails);
                    const totalListings = checkUserListingDetails.createListing.length;
                    const approvedListings = checkUserListingDetails.createListing.filter(listing => listing.status === 1).length;
                    const pendingListings = checkUserListingDetails.createListing.filter(listing => listing.status === 2).length;
                    const rejectedListings = checkUserListingDetails.createListing.filter(listing => listing.status === 3).length;

                    const approvedDeals = checkUserListingDetails.deals.filter(deals => deals.dealStatus === 1).length;
                    const pendingDeals = checkUserListingDetails.deals.filter(deals => deals.dealStatus === 2).length;
                    const rejectedDeals = checkUserListingDetails.deals.filter(deals => deals.dealStatus === 3).length;
                    res.status(200).json({
                        message: "Seller found",
                        data: {
                            totalListings,
                            approvedListings,
                            pendingListings,
                            checkRole,
                            checkUser,
                            rejectedListings,
                            approvedDeals,
                            pendingDeals,
                            rejectedDeals
                        }
                    });
                } else {
                    console.log('listing data is not found');
                    const defaultListingsData = {
                        totalListings: 0,
                        approvedListings: 0,
                        pendingListings: 0,
                        rejectedListings: 0,
                        approvedDeals: 0,
                        pendingDeals: 0,
                        rejectedDeals: 0
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
                    message: 'admin not found',
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