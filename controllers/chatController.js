const helper = require('../helper/helper')
const helperDB = require('../helper/helperDB')


module.exports.checkUserRoom = async (req, res) => {
    try {
        let { fromUserId, toUserId } = req.body;
        const checkRoom = await helperDB.checkRoom(fromUserId, toUserId);
        if (checkRoom != '') {
            res.status(200).json({ message: "Room Found", data: checkRoom.room_id })
        } else {
            let roomId = `${fromUserId}-${toUserId}`;
            const insertRoom = await helperDB.insertRoomInDb(fromUserId, toUserId, roomId);
            if (insertRoom !== '') {
                res.status(200).json({ message: "Room created sucessfully", data: insertRoom })
            }
        }
    } catch (err) {
        console.log('Error in getAllCreatedListing function',err);
    }
}

module.exports.getUserRooms = async (req, res) => {
    try {
        let { fromUserId } = req.body;
        console.log('req.body>>>>>>getUserRoomsgetUserRooms>>>>>>>>>>>>>>>',req.body)
        const checkRoom = await helperDB.getFromChatRooms(fromUserId);

        if (checkRoom.length > 0) {

            const combinedData = await Promise.all(checkRoom.map(async (roomIdObj) => {
                const lastmessages = await helperDB.getMessagesByRoom(roomIdObj.room_id);
                if (lastmessages.length > 0) {
                    let lastMessage = lastmessages[lastmessages.length - 1].message_content;
                    return {
                        ...roomIdObj,
                        lastmessages: lastMessage || []  
                    };
                } else {
                    return {
                        ...roomIdObj,
                        lastmessages: [] // or any default value you want to assign when there are no messages
                    };
                }
            }));
            
            console.log('combinedDatacombinedDatacombinedData',combinedData)
            res.status(200).json({ message: "Room Found", data: combinedData });
        }else {
            res.status(404).json({ message: "Room Not Found", data: [] })
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function',err);
    }


}

module.exports.getToUserRooms = async (req, res) => {
    try {
        let { getToUserId } = req.body;

        const checkRoom = await helperDB.getToUserChatRooms(getToUserId);

        if (checkRoom.length > 0) {

            const combinedData = await Promise.all(checkRoom.map(async (roomIdObj) => {
                const lastmessages = await helperDB.getMessagesByRoom(roomIdObj.room_id);
                let lastMessage=lastmessages[lastmessages.length-1]?.message_content;

                // Combine checkRoom data and lastmessages into a single object
                return {
                    ...roomIdObj,
                    lastmessages: lastMessage || [] // Assuming lastmessages is an array
                };
            }));

            res.status(200).json({ message: "Room Found", data: combinedData });
        } else {
            res.status(404).json({ message: "Room Not Found", data: [] });
        }
    } catch (err) {
        console.log('Error in getAllCreatedListing function', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.saveMessageInDatabase = async (req, res) => {
    try {
        let { message, room , getToUserId , time } = req.body;
        const saveMessage = await helperDB.saveMessage(message, room , getToUserId ,time);

        if (saveMessage != '') {
            res.status(200).json({ message: "saveMessage"})
        } else {
            res.status(500).json({ message: "something went wrong", data: [] })
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function',err);
    }


}
module.exports.getUserOldMessages = async (req, res) => {
    try {
        let { roomId } = req.body;
            console.log('room id>>>>>>>>>>>>>>>>',roomId)
        const fetcjOldChat = await helperDB.getMessagesByRoom(roomId );

        if (fetcjOldChat != '') {
            let lastMessage=fetcjOldChat[fetcjOldChat.length-1].message_content;
            res.status(200).json({ message: "fetched chat",data:fetcjOldChat,lastMessage:lastMessage})
        } else {
            res.status(500).json({ message: "something went wrong", data: [] })
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function',err);
    }

 
}


module.exports.searchChatByName = async (req, res) => {
    try {
        console.log('req.bodyData>>>>>>>>>>>>>>>>>>', req.body);
        let {searchChat,fromUserId} = req.body;
        const searchResult = await helperDB.searchChat(searchChat,fromUserId );
        console.log('searchResult',searchResult)
        if (searchResult != '') {
            res.status(200).json({ message: "fetched chat",data:searchResult})
        } else {
            res.status(500).json({ message: "something went wrong", data: [] })
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function',err);
    }


}

module.exports.searchChatByNameSeller = async (req, res) => {
    try {
        let {searchChat,getToUserId} = req.body;
        const searchSellerResult = await helperDB.searchSellerChat(searchChat,getToUserId );
        if (searchSellerResult != '') {
            res.status(200).json({ message: "fetched chat",data:searchSellerResult})
        } else {
            res.status(404).json({ message: "something went wrong", data: [] })
        }

    } catch (err) {
        console.log('Error in getAllCreatedListing function',err);
    }


}

exports.reporChat = async function (req, res) {
    try {
        const { token, comment, Spam, offensiveMessages,roomId, inaccurateInformation, other } = req.body;
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

        const modifiedValues = {
            Spam: Spam ? 'Spam' : '',
            offensiveMessages: offensiveMessages ? 'Offensive Messages' : '',
            inaccurateInformation: inaccurateInformation ? 'Inaccurate Information' : '',
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

        const saveReport = await helperDB.saveChatReportInDb(userId, comment, reason,roomId);

        if (saveReport) {
            return res.status(200).json({ message: 'Report submitted successfully' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.error('Error while creating a report', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};