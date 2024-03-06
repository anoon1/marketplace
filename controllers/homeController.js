const path = require('path');
const helperDB = require('../helper/helperDB')
const helper = require('../helper/helper')


module.exports.getLatestListing = async (req, res) => {
    try {
        console.log('in getLatestListing function');
        let getLatestListing = await helperDB.getLatestListingFromDb();
        // console.log('getLatestListinggetLatestListing',getLatestListing)
        if (getLatestListing.length > 0) {
            return res.status(200).json({ success: true, data: getLatestListing })
        } else if (getLatestListing === "") {
            return res.status(200).json({ success: true, data: [] })
        } else {
            return res.status(500).json({ success: false, data: [] })
        }
    } catch (err) {
        console.log('Error in getLatestListing function', err);
    }
}