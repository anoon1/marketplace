const { compareSync } = require("bcrypt");
const pool = require("../dbConfig/dbConnect");
const moment = require("moment");

/*********************Check user based on email**********************/
exports.checkUserInDb = async function (email) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking user", err);
          resolve("");
        } else {
          if (res.length > 0) {
            // console.log(res);
            resolve(res[0]);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/***********************Get latest listing *****************************/
exports.getLatestListingFromDb = async function () {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM create_listing WHERE status=1 ORDER BY created_at DESC LIMIT 6`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while getting latest listing", err);
          resolve("");
        } else {
          if (res.length > 0) {
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*********************Check user room in database**********************/
exports.checkRoom = async function (fromUserId, toUserId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_rooms WHERE from_userId = ${fromUserId} AND to_userId=${toUserId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking user chat rooms with froma and touser id", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res[0]);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*********************Get users messages from database**********************/
exports.getMessagesByRoom = async function (roomId) {
  console.log("roomId>>>>>>>>>>>>", roomId);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM messages WHERE room_id = '${roomId}' ORDER BY updated_at ASC`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking messages by roomId", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};
/**************************Search Chat*********************/
exports.searchChat = async function (name, userId) {
  return new Promise((resolve, reject) => {
    let whereClause;
    if (name !== '') {
      whereClause = `users.name LIKE '%${name}%' AND`;
    } else {
      whereClause = '';
    }
    pool.query(
      `SELECT users.*, user_rooms.* FROM users
      JOIN user_rooms ON users.id = user_rooms.to_userid
      LEFT JOIN chat_reports ON user_rooms.room_id = chat_reports.room_id
      WHERE ${whereClause} user_rooms.from_userid = ${userId} AND chat_reports.room_id IS NULL `,
      async (err, res) => {
        if (err) {
          console.log(`SELECT users.*, user_rooms.* FROM users
      JOIN user_rooms ON users.id = user_rooms.to_userid
      LEFT JOIN chat_reports ON user_rooms.room_id = chat_reports.room_id
      WHERE ${whereClause} user_rooms.from_userid = ${userId} AND chat_reports.room_id IS NULL `)
          console.log("Getting error while checking search chat", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/**************************Search seller Chat*********************/
exports.searchSellerChat = async function (name, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT users.*, user_rooms.* FROM users
      JOIN user_rooms ON users.id = user_rooms.from_userid
      LEFT JOIN chat_reports ON user_rooms.room_id = chat_reports.room_id
      WHERE users.name LIKE '%${name}%' AND user_rooms.to_userId = ${userId} AND chat_reports.room_id IS NULL`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking search seller", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*********************Insert messages of users in database**********************/
exports.saveMessage = async function (message, room, getToUserId, time) {
  return new Promise((resolve, reject) => {
    console.log("tinme>>>>>>>", time);
    pool.query(
      `INSERT INTO messages (sender_id, message_content, room_id,created_at) VALUES (${getToUserId}, '${message}', '${room}', '${new Date()}')`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while saving message", err);
          resolve("");
        } else {
          console.log("message saved successfully");
          resolve(getToUserId);
        }
      }
    );
  });
};
/*********************Insert user room in database**********************/
exports.insertRoomInDb = async function (fromUserId, toUserId, roomId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO user_rooms (from_userid, to_userid, room_id, created_at) VALUES (${fromUserId}, ${toUserId}, '${roomId}', now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting room", err);
          resolve("");
        } else {
          console.log("Data saved successfully");
          resolve(roomId);
        }
      }
    );
  });
};

/*********************get chat room from database for buyer**********************/
exports.getFromChatRooms = async function (fromUserId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_rooms.*, users.* FROM user_rooms
       JOIN users ON user_rooms.to_userid = users.id
       LEFT JOIN chat_reports ON user_rooms.room_id = chat_reports.room_id
       WHERE user_rooms.from_userid = ${fromUserId} AND chat_reports.room_id IS NULL`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while getting room", err);
          resolve("");
        } else {
          if (res.length > 0) {
            resolve(res);
          } else {
            console.log("Room not found");
            resolve([]);
          }
        }
      }
    );
  });
};

/*********************get chat room from database for buyer**********************/
exports.getUserDataForTop = async function (fromUserId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_rooms.*, users.* FROM user_rooms
       JOIN users ON user_rooms.to_userid = users.id
       LEFT JOIN chat_reports ON user_rooms.room_id = chat_reports.room_id
       WHERE user_rooms.from_userid = ${fromUserId} AND chat_reports.room_id IS NULL`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while getting room", err);
          resolve("");
        } else {
          if (res.length > 0) {
            resolve(res);
          } else {
            console.log("Room not found");
            resolve([]);
          }
        }
      }
    );
  });
};

/*********************get chat room from database for buyer**********************/
exports.getToUserChatRooms = async function (fromUserId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_rooms.*, users.* FROM user_rooms
       JOIN users ON user_rooms.from_userid = users.id
       LEFT JOIN chat_reports ON user_rooms.room_id = chat_reports.room_id
       WHERE user_rooms.to_userid = ${fromUserId} AND chat_reports.room_id IS NULL`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while getting room", err);
          resolve("");
        } else {
          if (res.length > 0) {
            resolve(res);
          } else {
            console.log("Unreported chat rooms not found");
            resolve([]);
          }
        }
      }
    );
  });
};

/*****************************Insert user in database************************/
exports.insertUser = async function (name, email, hashedPassword, interestedIn) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users (name, email, password, role_id, created_at)
                 VALUES ('${name}','${email}','${hashedPassword}',${interestedIn}, NOW())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting user", err);
          resolve("");
        } else {
          console.log("Data saved successfully");
          resolve("done");
        }
      }
    );
  });
};

/*********************************update token in database*************/
exports.updateTokenInDb = async function (token, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET token = '${token}',updated_at=now() WHERE id = ${userId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating token", err);
          resolve("");
        } else {
          console.log("token saved sucessfully");
          resolve("done");
        }
      }
    );
  });
};

/*******************Check duplicate otp in db*****************/
exports.checkOtpInDb = async function (userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_otp WHERE user_id =${userId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking OTP", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*******************delete duplicate otp in db*****************/
exports.deleteOldOtp = async function (userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM user_otp WHERE user_id=${userId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while deleting old OTP", err);
          resolve("");
        } else {
          console.log("Old Otp deleted sucessfully");
          resolve("Old Otp deleted");
        }
      }
    );
  });
};

/*******************delete duplicate otp in db*****************/
exports.insertOtpInDb = async function (userId, otp) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO user_otp (user_id, otp, created_at) VALUES (${userId}, ${otp}, now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting OTP", err);
          resolve("");
        } else {
          console.log("Otp saved sucessfully");
          resolve("otp saved");
        }
      }
    );
  });
};

/*******************Check duplicate otp in db*****************/
exports.verifyOtp = async function (user, otp) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_otp WHERE user_id = ${user} AND otp = ${otp}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while verifying OTP", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("OTP not matched");
            resolve("");
          }
        }
      }
    );
  });
};

exports.changePassword = async function (newPassword, token) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET password = '${newPassword}' WHERE token='${token}'`,
      async (err, res) => {
        if (err) {
          console.log("Getting error changing password", err);
          resolve("");
        } else {
          console.log("password update sucessfully");
          resolve("done");
        }
      }
    );
  });
};

/*********************Check user based on token**********************/
exports.checkUserWithToken = async function (token) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE token = '${token}'`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking user", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log('checkluser??????????????', res);
            resolve(res[0]);
          } else {
            console.log("No data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*********************Select all listings**********************/
exports.getAllListing = function (token) {
  return new Promise((resolve, reject) => {
    const result = {};

    // Query to get data from create_listing
    pool.query(
      `SELECT seller_id, title, id, status FROM create_listing`,
      (err1, res1) => {
        if (err1) {
          console.error("Error while getting create_listing details", err1);
          reject(err1);
        } else {
          result.createListing = res1;

          // Query to get data from deals
          pool.query(
            `SELECT id AS dealId, listing_id AS dealListingId, status AS dealStatus FROM deals`,
            (err2, res2) => {
              if (err2) {
                console.error("Error while getting deals details", err2);
                reject(err2);
              } else {
                result.deals = res2;
                resolve(result);
              }
            }
          );
        }
      }
    );
  });
};

exports.updateProfile = async function (
  name,
  businessName,
  businessType,
  description,
  about,
  userEmail,
  finalUrl,
  ssnNumber,
  stepCompleted
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
            SET business_name="${businessName}",name="${name}",ssn_number='${ssnNumber}', business_type="${businessType}",about="${about}",step_1=${stepCompleted}, description="${description}",profile_picture="${finalUrl}",updated_at=now()
            WHERE email="${userEmail}"`,
      async (err, res) => {
        if (err) {
          console.log("Error updating profile", err);
          resolve("");
        } else {
          console.log("Profile updated sucessfully");
          resolve("done");
        }
      }
    );
  });
};

/***********************updateAdminProfile****************************/
exports.updateAdminProfile = async function (
  name,
  description,
  userEmail,
  finalUrl
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
            SET  name="${name}", description="${description}",profile_picture="${finalUrl}",updated_at=now()
            WHERE email="${userEmail}"`,
      async (err, res) => {
        if (err) {
          console.log("Error updating profile", err);
          resolve("");
        } else {
          console.log("Profile updated sucessfully");
          resolve("done");
        }
      }
    );
  });
};
/*********************Check user role**********************/
exports.userRoleCheck = async function (roleId) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM roles WHERE id = ${roleId}`, async (err, res) => {
      if (err) {
        console.log("Getting error while checking role", err);
        resolve("");
      } else {
        if (res.length > 0) {
          // console.log('res>>>>>>>>>>', res);
          resolve(res[0].type);
        } else {
          console.log("no data found");
          resolve("");
        }
      }
    });
  });
};

/*******************Save user documents db*****************/
exports.updateUserDocuments = async function (
  documentId,
  userId,
  docImagePath,
  docType,
  listingId
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE user_documents SET
        user_id = ${userId},
        listing_id = ${listingId},
        document = '${docImagePath}',
        type = '${docType}'
      WHERE document_id = ${documentId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating documents", err);
          reject(err);
        } else {
          console.log("Documents updated successfully");
          resolve();
        }
      }
    );
  });
};

/*******************cerate listing*****************/
exports.createListing = async function (listingData) {
  return new Promise((resolve, reject) => {
    const {
      description,
      sellingReason,
      askingPrice,
      industryType,
      netProfit,
      version,
      businessModel,
      revenue,
      link,
      downloads,
      rating,
      token,
      title,
      userId,
      imagePath,
      thumbnailFinalPath,
      thumbnailURL
    } = listingData;
    console.log("listingDatalistingDatalistingDatalistingData", listingData);
    pool.query(
      `INSERT INTO create_listing
                (title, seller_id, description, selling_reason, asking_price, industry_type, version, business_model, net_profit, revenue, link, downloads, rating, listing_image,listing_thumbnail, how_it_works, created_at)
                VALUES ('${title}', ${userId}, '${description}', '${sellingReason}', '${askingPrice}', '${industryType}', '${version}', '${businessModel}', '${netProfit}', '${revenue}', '${link}', '${downloads}', ${rating},'${thumbnailFinalPath}', '${thumbnailURL}' ,'${imagePath}', now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while creating listing", err);
          reject(err);
        } else {
          const insertedId = res.insertId;
          console.log("Listing created successfully with ID:", insertedId);
          resolve(insertedId);
        }
      }
    );
  });
};

/*******************Save user documents db*****************/
exports.saveUserDocuments = async function (
  userId,
  docImagePath,
  docType,
  listingId,
  documentType
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO user_documents (user_id, listing_id, document,type,documentType) VALUES (${userId}, ${listingId},'${docImagePath}', '${docType}', '${documentType}')`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting documents", err);
          resolve("");
        } else {
          console.log("documents saved sucessfully");
          resolve("saved");
        }
      }
    );
  });
};

/*******************Update user documents db*****************/
exports.updateUserDocumentsInDb = async function (
  userId,
  docImagePath,
  listingId,
  documentType
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO user_documents (user_id, listing_id, document,type ,updated_at)
       VALUES (${userId}, ${listingId}, '${docImagePath}','${documentType}', now())
       ON DUPLICATE KEY UPDATE
         document = '${docImagePath}',
         updated_at = now()`,
      async (err, res) => {
        if (err) {
          console.log("Error while updating documents", err);
          resolve("");
        } else {
          if (res.affectedRows > 0) {
            console.log("Documents updated successfully");
            resolve("updated");
          } else {
            console.log("No matching records found for update");
            resolve("");
          }
        }
      }
    );
  });
};

/***************************Update listing********************/

exports.updateListing = async function (listingData) {
  return new Promise((resolve, reject) => {
    const {
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
      downloads,
      token,
      title,
      userId,
      rating,
      imagePath,
      thumbnailFinalPath,
      thumbnailURL: thumbnailURL
    } = listingData;

    pool.query(
      `UPDATE create_listing SET
        title = '${title}',
        seller_id = ${userId},
        description = '${description}',
        selling_reason = '${selling_reason}',
        asking_price = '${asking_price}',
        industry_type = '${industry_type}',
        version = '${version}',
        business_model = '${business_model}',
        net_profit = '${net_profit}',
        revenue = '${revenue}',
        link = '${link}',
        downloads = '${downloads}',
        rating = ${rating},
        how_it_works = '${imagePath}',
        listing_image='${thumbnailFinalPath}',
        listing_thumbnail='${thumbnailURL}',
        
        updated_at = now()
      WHERE id = ${id}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating listing", err);
          reject(err);
        } else {
          console.log("Listing updated successfully");
          resolve(id);
        }
      }
    );
  });
};

/*********************Get user listing **********************/
exports.getListingFromDb = async function (userId, pageNo, pageSize) {
  const offset = (pageNo - 1) * pageSize;

  return new Promise((resolve, reject) => {
    // Count the total number of rows for the given userId
    pool.query(
      `SELECT COUNT(*) as total FROM create_listing WHERE seller_id=${userId}`,
      async (countErr, countResult) => {
        if (countErr) {
          console.log("Getting error while counting rows", countErr);
          reject(countErr);
          return;
        }

        const totalRows = countResult[0].total;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalRows / pageSize);

        // Fetch the specific page data
        pool.query(
          `SET SESSION group_concat_max_len = 1000000`,
          async (setSessionErr, setSessionResult) => {
            if (setSessionErr) {
              console.log("Error setting session", setSessionErr);
              reject(setSessionErr);
              return;
            }

            pool.query(
              `SELECT cl.*, GROUP_CONCAT(ud.document) AS document
              FROM create_listing cl
              LEFT JOIN user_documents ud ON cl.id = ud.listing_id AND ud.type = 'listing'
              WHERE cl.seller_id  = ${userId}
              GROUP BY cl.id
              ORDER BY cl.created_at DESC
              LIMIT ${pageSize} OFFSET ${offset}`,
              async (err, res) => {
                if (err) {
                  console.log("Getting error while fetching listing", err);
                  reject(err);
                } else {
                  // Include the total pages in the result
                  resolve({ data: res, totalPages });
                }
              }
            );
          }
        );
      }
    );
  });
};

/*********************Get user listing **********************/
exports.getAllListingFromDb = async function ({
  pageNo,
  pageSize,
  category,
  price,
  review,
  searchByName
}) {
  return new Promise((resolve, reject) => {
    console.log(
      "requeseted Data:::::::::::::::",
      pageNo,
      pageSize,
      category,
      price,
      review,
      searchByName
    );
    const offset = (pageNo - 1) * pageSize;
    const name = searchByName || "";
    const cat =
      category && category !== "All" ? `industry_type='${category}'` : "";
    const nameFilter = name !== "" ? `title LIKE ?` : "";
    const rating = review && review !== "All" ? `rating=${review}` : "";
    const priceCondition =
      price && price !== "All"
        ? `ORDER BY asking_price ${price === "low" ? "ASC" : "DESC"}`
        : "";
    const statusCond = `status=1`;
    const conditions = [cat, statusCond, rating, nameFilter].filter(Boolean);
    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Count the total number of rows for the given conditions
    const countSql = `SELECT COUNT(*) as total FROM create_listing ${whereClause}`;
    const countParams = name !== "" ? [`%${name}%`] : [];

    pool.query(countSql, countParams, async (countErr, countResult) => {
      if (countErr) {
        console.log("Getting error while counting rows", countErr);
        reject(countErr);
        return;
      }

      const totalRows = countResult[0].total;

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalRows / pageSize);

      // Fetch the specific page data
      const fetchSql = `SELECT * FROM create_listing ${whereClause} ${priceCondition} LIMIT ? OFFSET ?`;
      const fetchParams =
        name !== "" ? [`%${name}%`, pageSize, offset] : [pageSize, offset];

      pool.query(fetchSql, fetchParams, async (err, res) => {
        if (err) {
          console.log(fetchSql);
          console.log("Getting error while fetching listing", err);
          reject(err);
        } else {
          console.log(fetchSql);
          // Include the total pages in the result
          resolve({ data: res, totalPages });
        }
      });
    });
  });
};

exports.getAllFilterListingFromDb = async function (
  pageNo,
  pageSize,
  category,
  review,
  price
) {
  const offset = (pageNo - 1) * pageSize;

  return new Promise((resolve, reject) => {
    // Count the total number of rows for the given userId
    let sql = "";
    if (category !== "All") {
      sql = "Where ";
    }
    if (review !== "All") {
      if (sql == "") {
        sql = "";
      } else {
        sql = "";
      }
    }
    if (price !== "All") {
      if (sql == "") {
        sql = "";
      } else {
        sql = "";
      }
    }

    pool.query(
      `SELECT COUNT(*) as total FROM create_listing Where`,
      async (countErr, countResult) => {
        if (countErr) {
          console.log("Getting error while counting rows", countErr);
          reject(countErr);
          return;
        }

        const totalRows = countResult[0].total;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalRows / pageSize);

        // Fetch the specific page data
        pool.query(
          `SELECT * FROM create_listing LIMIT ${pageSize} OFFSET ${offset}`,
          async (err, res) => {
            if (err) {
              console.log("Getting error while fetching listing", err);
              reject(err);
            } else {
              // Include the total pages in the result
              resolve({ data: res, totalPages });
            }
          }
        );
      }
    );
  });
};

exports.getSingleListingFromDb = async function (list_id) {
  return new Promise((resolve, reject) => {
    // Fetch the specific page data
    pool.query(
      `SELECT * FROM create_listing WHERE id=${list_id}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while fetching listing", err);
          reject(false);
        } else {
          // Include the total pages in the result
          resolve(res);
        }
      }
    );
  });
};

exports.getFavouriteListing = async function (
  userId,
  page,
  pageSize,
  searchName
) {
  return new Promise((resolve, reject) => {
    // Calculate the offset based on the page and pageSize
    const offset = (page - 1) * pageSize;

    // Count the total number of rows for the given userId
    pool.query(
      `SELECT COUNT(create_listing.id) AS count
      FROM favourite_list
      JOIN create_listing ON favourite_list.listing_id = create_listing.id
      WHERE favourite_list.buyer_id = ${userId} AND create_listing.title LIKE '%${searchName}%';
      `,
      async (countErr, countResult) => {
        if (countErr) {
          console.log("Getting error while counting rows", countErr);
          reject(countErr);
          return;
        }
        console.log("countResultcountResultcountResult", countResult);
        const totalRows = countResult[0].count;
        console.log("totalRowstotalRowstotalRows", totalRows);

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalRows / pageSize);

        // Construct the SQL query with pagination and search by name filter
        let nameFilter = "";
        if (searchName) {
          nameFilter = ` AND create_listing.title LIKE '%${searchName}%'`;
        }
        let query = `
          SELECT create_listing.*
          FROM favourite_list
          JOIN create_listing ON favourite_list.listing_id = create_listing.id
          WHERE favourite_list.buyer_id = ${userId} ${nameFilter} ORDER BY created_at DESC
        `;

        // Add search by name filter if provided

        // Add pagination
        query += ` LIMIT ${pageSize} OFFSET ${offset}`;

        // Execute the query
        pool.query(query, async (err, res) => {
          if (err) {
            console.log("Getting error while fetching favourite listing", err);
            reject(err);
          } else {
            // Corrected the resolve statement
            resolve({ data: res, totalPages });
          }
        });
      }
    );
  });
};

exports.getFavouriteListingForCheck = async function (userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT * FROM favourite_list WHERE buyer_id=${userId}
      `,
      (err, res) => {
        if (err) {
          console.log("Getting error while fetching favourite listing", err);
          reject(err);
        } else {
          console.log("res>>>>>>>>>>>>", res);
          resolve({ data: res });
        }
      }
    );
  });
};

/*********************************update buyer profile in database*************/
exports.updateBuyerProfile = async function (
  userId,
  name,
  budget,
  aboutMe,
  stepCheck,
  interestedOption
) {
  console.log("budget in saving database", budget);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET name='${name}', interested_industry = '${interestedOption}',budget= '${budget}',about='${aboutMe}',step_1=${stepCheck},updated_at=now() WHERE id = ${userId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating buyer profile", err);
          resolve("");
        } else {
          console.log("buyer profile updated sucessfully");
          resolve("done");
        }
      }
    );
  });
};

/*********************Get listing by id **********************/
exports.getListingById = async function (listingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM create_listing WHERE id=${listingId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while fethcing listing", err);
          resolve("");
        } else {
          if (res.length > 0) {
            // console.log(res);
            resolve(res[0]);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*********************delete listing by id **********************/
exports.deleteListingWithId = async function (itemId, sellerId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM create_listing WHERE id=${itemId} AND seller_id=${sellerId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while deleting listing", err);
          resolve("");
        } else {
          let deleteFromUserDoc = await deleteUserDocuments(itemId, sellerId);
          if (deleteFromUserDoc) {
            console.log(
              "deleteUserDocuments response>>>>>>>>",
              deleteFromUserDoc
            );
            console.log("Listing deleted sucessfully");
            resolve("deleted");
          }
        }
      }
    );
  });
};
async function deleteUserDocuments(itemId, sellerId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM user_documents WHERE listing_id = ? AND user_id = ?",
      [itemId, sellerId],
      (err, res) => {
        if (err) {
          console.log("Error while deleting user documents:", err);
          reject(err);
        } else {
          console.log("User documents deleted successfully");
          resolve("done");
        }
      }
    );
  });
}
/*********************Get listing by Userid **********************/
exports.getListingBySellerId = async function (id) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM create_listing WHERE seller_id=${id}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while fethcing listing", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*****************Get buyer by Id**********************/
exports.getBuyerData = async function (id, roleId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE id=${id} AND role_id=${roleId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while getting buyer", err);
          resolve("");
        } else {
          if (res.length > 0) {
            console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};
/*********************Get listing by SellerId **********************/
exports.getSellerListing = async function (sellerId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM deals WHERE seller_id=${sellerId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while fethcing listing", err);
          resolve("");
        } else {
          if (res.length > 0) {
            // console.log(res);
            resolve(res);
          } else {
            console.log("no data found");
            resolve("");
          }
        }
      }
    );
  });
};

/*******************Save deal in db*****************/
exports.saveDealInDb = async function (
  listingId,
  sellingPrice,
  userId,
  sellerId
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO deals (listing_id,selling_price, seller_id, buyer_id,created_at) VALUES ('${listingId}', '${sellingPrice}',${sellerId},${userId},now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting deal", err);
          resolve("");
        } else {
          console.log("deal saved saved sucessfully");
          resolve("saved");
        }
      }
    );
  });
};

/*********************Get user listing **********************/
exports.getBuyerDeals = async function (userId, page, pageSize, searchTitle) {
  return new Promise((resolve, reject) => {
    console.log("pageNopageNopageNopageNo", page);
    const offset = (page - 1) * pageSize;
    let whereClause = "";
    if (searchTitle) {
      whereClause = `AND create_listing.title LIKE '%${searchTitle}%'`;
    }
    pool.query(
      `SELECT COUNT(*) as total FROM deals JOIN create_listing ON deals.listing_id = create_listing.id WHERE deals.buyer_id=${userId} ${whereClause}`,
      async (countErr, countResult) => {
        if (countErr) {
          console.log("Getting error while counting rows", countErr);
          reject(countErr);
          return;
        }

        const totalRows = countResult[0].total;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalRows / pageSize);

        // Fetch the specific page data{
        pool.query(
          `SELECT deals.id AS dealsId ,deals.listing_id,deals.selling_price,deals.status AS dealsStatus, payment_history.status As paymentStatus, create_listing.* FROM deals 
          lEFT JOIN payment_history ON deals.id = payment_history.deal_id
          JOIN create_listing ON deals.listing_id = create_listing.id WHERE deals.buyer_id=${userId}  ${whereClause} ORDER BY deals.created_at DESC LIMIT ${pageSize} OFFSET ${offset}`,
          async (err, res) => {
            if (err) {
              console.log("Getting error while fethcing deals", err);
              resolve("");
            } else {
              if (res.length > 0) {
                // console.log(res);
                console.log("get deals data>>>>>>>>>>", res);
                resolve({ data: res, totalPages });
              } else {
                console.log("no data found");
                resolve("");
              }
            }
          }
        );
      }
    );
  });
};

/*********************Get user docs **********************/
exports.getUserDocs = async function (page, pageSize) {
  return new Promise((resolve, reject) => {
    console.log("pageNopageNopageNopageNo", page);
    const offset = (page - 1) * pageSize;
    pool.query(
      `SELECT COUNT(*) as total FROM user_documents JOIN users ON user_documents.user_id = users.id WHERE user_documents.status=2 AND type='buyerDoc'`,
      async (countErr, countResult) => {
        if (countErr) {
          console.log("Getting error while counting rows", countErr);
          reject(countErr);
          return;
        }

        const totalRows = countResult[0].total;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalRows / pageSize);

        // Fetch the specific page data{
        pool.query(
          `SELECT
          user_documents.user_id,
          user_documents.status AS docStatus,
          MAX(user_documents.type) AS type,
          MAX(user_documents.created_at) AS created_at,
          users.name
      FROM
          user_documents
      JOIN
          users ON user_documents.user_id = users.id
      WHERE
          user_documents.type = 'buyerDoc'
      GROUP BY
          user_documents.user_id
      ORDER BY
          MAX(user_documents.created_at) DESC
      LIMIT
          ${pageSize}
      OFFSET
          ${offset};
      `,
          async (err, res) => {
            if (err) {
              console.log("Getting error while fethcing documents", err);
              resolve("");
            } else {
              if (res.length > 0) {
                // console.log(res);
                resolve({ data: res, totalPages });
              } else {
                console.log("no data found");
                resolve("");
              }
            }
          }
        );
      }
    );
  });
};
/*********************Get all report listing for admin **********************/
exports.getAdminReportsListing = async function (page, pageSize) {
  return new Promise((resolve, reject) => {
    console.log("pageNopageNopageNopageNo", page);
    const offset = (page - 1) * pageSize;
    pool.query(
      `SELECT COUNT(*) as total FROM reports_list JOIN create_listing ON reports_list.listing_id = create_listing.id`,
      async (countErr, countResult) => {
        if (countErr) {
          console.log("Getting error while counting rows", countErr);
          reject(countErr);
          return;
        }

        const totalRows = countResult[0].total;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalRows / pageSize);

        // Fetch the specific page data{
        pool.query(
          `SELECT reports_list.reason,reports_list.comment,reports_list.status AS reportStatus, create_listing.* FROM reports_list JOIN create_listing ON reports_list.listing_id = create_listing.id LIMIT ${pageSize} OFFSET ${offset}`,
          async (err, res) => {
            if (err) {
              console.log("Getting error while fethcing deals", err);
              resolve("");
            } else {
              if (res.length > 0) {
                // console.log(res);
                resolve({ data: res, totalPages });
              } else {
                console.log("no data found");
                resolve("");
              }
            }
          }
        );
      }
    );
  });
};
/*********************Get all getSellerDocumenmtImages for admin **********************/
exports.getUserDocumenmtImages = async function (userId, listing_id) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(
        `
      SELECT GROUP_CONCAT(document SEPARATOR ',') AS allDoc,user_id,listing_id,status FROM user_documents WHERE user_id = ${userId} AND listing_id=${listing_id}
      `,
        async (err, res) => {
          if (err) {
            console.log("Getting error while fethcing deals", err);
            resolve("");
          } else {
            if (res.length > 0) {
              resolve({ data: res });
            } else {
              console.log("no data found");
              resolve("");
            }
          }
        }
      );
    } catch (err) {
      console.log("err", err);
      resolve("");
    }
  });
};

/*********************Get all getBuyerDocumenmtImages for admin **********************/
exports.getBuyerDocumenmtImages = async function (userId, listing_id) {
  let whereClause;
  if (listing_id !== undefined && listing_id !== 'undefined' && listing_id !== '') {
    console.log('userId, listing_id', userId, listing_id);
    whereClause = `WHERE user_id = ${userId} AND listing_id=${listing_id}`
  } else {
    console.log('userId', userId);

    whereClause = `WHERE user_id = ${userId}`
  }
  return new Promise((resolve, reject) => {
    try {
      pool.query(
        `
      SELECT GROUP_CONCAT(document SEPARATOR ',') AS allDoc,user_id,listing_id,status FROM user_documents  ${whereClause}
      `,
        async (err, res) => {
          if (err) {
            console.log("Getting error while fethcing deals", err);
            resolve("");
          } else {
            if (res.length > 0) {
              resolve({ data: res });
            } else {
              console.log("no data found");
              resolve("");
            }
          }
        }
      );
    } catch (err) {
      console.log("err", err);
      resolve("");
    }
  });
};

exports.getSellerDocumenmtImages = async function (userId, listingId) {
  return new Promise((resolve, reject) => {
    try {
      pool.query(
        `
      SELECT GROUP_CONCAT(document SEPARATOR ',') AS allDoc , user_id ,listing_id ,status FROM user_documents WHERE user_id = ${userId} AND listing_id=${listingId}
      `,
        async (err, res) => {
          if (err) {
            console.log(
              `SELECT GROUP_CONCAT(document SEPARATOR ',') AS allDoc FROM user_documents WHERE user_id = ${userId} AND listing_id=${listingId}`
            );
            console.log("Getting error while fethcing deals", err);
            resolve("");
          } else {
            if (res.length > 0) {
              console.log(
                `SELECT GROUP_CONCAT(document SEPARATOR ',') AS allDoc FROM user_documents WHERE user_id = ${userId} AND listing_id=${listingId}`
              );
              resolve({ data: res });
            } else {
              console.log(
                `SELECT GROUP_CONCAT(document SEPARATOR ',') AS allDoc FROM user_documents WHERE user_id = ${userId} AND listing_id=${listingId}`
              );
              console.log("no data found");
              resolve("");
            }
          }
        }
      );
    } catch (err) {
      console.log("err", err);
      resolve("");
    }
  });
};
/*******************Save report in db*****************/
exports.saveReportInDb = async function (userId, comment, reason, listingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO reports_list (user_id,reason,comment,listing_id,created_at) VALUES (${userId}, '${comment}','${reason}',${listingId},now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting report", err);
          resolve("");
        } else {
          console.log("report submitted sucessfully");
          resolve("submitted");
        }
      }
    );
  });
};

/*******************Save chat report in db*****************/
exports.saveChatReportInDb = async function (userId, comment, reason, roomid) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO chat_reports (user_id,reason,comment,room_id,created_at) VALUES (${userId}, '${comment}','${reason}','${roomid}',now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting report", err);
          resolve("");
        } else {
          console.log("report submitted sucessfully");
          resolve("submitted");
        }
      }
    );
  });
};

/*******************Delete doc in db*****************/
exports.deleteDocEntryFromDb = async function (userId, img) {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM user_documents WHERE user_id=${userId} AND document='${img}'`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while  deleting document", err);
          resolve("");
        } else {
          console.log("Document deleted sucessfully");
          resolve("deleted");
        }
      }
    );
  });
};

/*******************Delete seller doc in db*****************/
exports.deleteSellerDocEntryFromDb = async function (userId, img) {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch the existing document field for the user
      await pool.query(
        `SELECT document FROM user_documents WHERE user_id=${userId}`,
        async (err, res) => {
          if (err) {
            console.log("error while getting old documents");
          } else {
            console.log("res>>>>>>>>>>", res);
            if (res.length > 0) {
              const currentDocument = res[0].document;
              const documentArray = currentDocument.split(",");

              // Remove the specific image link from the array
              const updatedDocumentArray = documentArray.filter(
                link => link !== img
              );
              const updatedDocument = updatedDocumentArray.join(",");
              await pool.query(
                `UPDATE user_documents SET document='${updatedDocument}' WHERE user_id=${userId}`,
                (err, res) => {
                  if (err) {
                    console.log(
                      "Error while updating images data in database",
                      err
                    );
                  } else {
                    console.log("Images updated sucessfully");
                    resolve("Deleted");
                  }
                }
              );
            }
          }
        }
      );
    } catch (err) {
      console.log("Error while updating document", err);
      resolve("");
    }
  });
};

/***************************get reported lising**********************************/
exports.getBuyerReportedListingFromDb = async function (
  userId,
  pageNo,
  pageSize
) {
  const offset = (pageNo - 1) * pageSize;

  return new Promise((resolve, reject) => {
    // Fetch the specific page data
    pool.query(
      `
        SELECT reports_list.*,create_listing.* 
        FROM create_listing
        JOIN reports_list ON create_listing.id = reports_list.listing_id
        WHERE reports_list.user_id = ${userId}
        LIMIT ${pageSize}
        OFFSET ${offset};        
        `,
      async (err, listingResult) => {
        if (err) {
          console.log("Getting error while fetching listing", err);
          reject(err);
          return;
        }

        // Fetch the total count
        pool.query(
          `
            SELECT COUNT(*) AS total
            FROM create_listing
            JOIN reports_list ON create_listing.id = reports_list.listing_id
            WHERE reports_list.user_id = ${userId};
            `,
          async (countErr, countResult) => {
            if (countErr) {
              console.log("Getting error while counting rows", countErr);
              reject(countErr);
              return;
            }

            const totalRows = countResult[0].total;
            const totalPages = Math.ceil(totalRows / pageSize);

            // Include the total pages in the result
            resolve({ data: listingResult, totalPages });
          }
        );
      }
    );
  });
};

/*********************Check favourite listing already exist on not **********************/
exports.checkFavouriteInDb = async function (userId, listingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM favourite_list WHERE buyer_id=${userId} AND listing_id=${listingId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while checking favourite listing", err);
          reject(err);
        } else {
          if (res.length > 0) {
            console.log("favourite listing already exist");
            resolve(res[0]);
          } else {
            console.log("not exist");
            resolve("");
          }
        }
      }
    );
  });
};

/*********************get bid of seller listing **********************/
exports.getBidBySellerId = async function (sellerId, pageNo, pageSize, status) {
  return new Promise((resolve, reject) => {
    const offset = (pageNo - 1) * pageSize;
    console.log("sellerId::::::::::", sellerId);
    let statusFilter = "";
    let dealsStatus = "";
    if (status != "") {
      statusFilter = `AND status=${status}`;
      dealsStatus = `AND deals.status=${status}`;
    } else {
      statusFilter = "";
    }
    pool.query(
      `SELECT deals.listing_id,deals.id, deals.selling_price, deals.created_at, deals.buyer_id, deals.status AS bid_status, create_listing.title, create_listing.listing_thumbnail, users.name, payment_history.status As paymentStatus
       FROM deals
       LEFT JOIN payment_history ON deals.id = payment_history.deal_id
       JOIN create_listing ON deals.listing_id = create_listing.id
       JOIN users ON deals.buyer_id = users.id
       WHERE deals.seller_id = ${sellerId}
       ${dealsStatus} 
       ORDER BY deals.created_at DESC
       LIMIT ${pageSize} OFFSET ${offset}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while fetching bids by sellerId", err);
          reject(err);
        } else {
          // Fetch the total count
          console.log('biddind response>> ', res)
          pool.query(
            `SELECT COUNT(*) AS total
             FROM deals
             WHERE seller_id = ${sellerId} ${statusFilter}`,
            async (countErr, countResult) => {
              if (countErr) {
                console.log("Getting error while counting rows", countErr);
                reject(countErr);
              } else {
                const totalRows = countResult[0].total;
                const totalPages = Math.ceil(totalRows / pageSize);
                console.log("Bids fetched successfully");
                resolve({ data: res, totalPages });
              }
            }
          );
        }
      }
    );
  });
};

/*********************Save favourite listing **********************/
exports.saveFavouriteListing = async function (userId, listingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO favourite_list (buyer_id,listing_id,created_at) VALUES (${userId},${listingId},now())`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting favourite listing", err);
          resolve("");
        } else {
          console.log("favourite listing submitted sucessfully");
          resolve("submitted");
        }
      }
    );
  });
};

/*********************Save favourite listing **********************/
exports.removeFavouriteListingInDb = async function (userId, listingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE from favourite_list WHERE buyer_id= ${userId} AND listing_id= ${listingId}`,
      async (err, result) => {
        if (err) {
          console.error("Error while deleting favourite listing", err);
          reject("Error while deleting favourite listing");
        } else {
          if (result.affectedRows > 0) {
            console.log("Favourite listing deleted successfully");
            resolve("Favourite listing deleted successfully");
          } else {
            console.log("Favourite listing not found");
            reject("Favourite listing not found");
          }
        }
      }
    );
  });
};

/*********************************update buyer profile in database*************/
exports.changeStatusOfBid = async function (bidId, status, userId, checkReason) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE deals SET status = ${status},rejection_reason='${checkReason}' ,updated_at=now() WHERE seller_id = ${userId} AND id=${bidId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating buyer profile", err);
          resolve("");
        } else {
          console.log("bid status changed");
          resolve("done");
        }
      }
    );
  });
};

/*********************************update listing status in database*************/
exports.updateListingStatusInDb = async function (id, status, reason) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE create_listing SET status = ${status},rejection_reason='${reason}' ,updated_at=now() WHERE id = ${id} `,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating buyer profile", err);
          resolve("");
        } else {
          console.log("listing status changed1");
          let docRejectReason = 'listing has been rejected';
          await exports.updateDocStatusInAfterListing(id, status, docRejectReason);
          resolve("done");
        }
      }
    );
  });
};

/*****************************update doc status with rejecting listing********************/
exports.updateDocStatusInAfterListing = async function (id, status, reason) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE user_documents SET status = ${status},rejection_reason='${reason}' ,updated_at=now() WHERE listing_id = ${id} `,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating buyer profile", err);
          resolve("");
        } else {
          console.log("Status updated sucessfully");
          resolve("done");
        }
      }
    );
  });
};
/*********************************update doc status in database*************/
exports.updateDocStatusInDb = async function (id, status, reason) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE user_documents SET status = ${status},rejection_reason='${reason}' ,updated_at=now() WHERE user_id = ${id} `,
      async (err, res) => {
        if (err) {
          console.log("Getting error while updating buyer profile", err);
          resolve("");
        } else {
          console.log("Status updated sucessfully");
          resolve("done");
        }
      }
    );
  });
};
// /*********************************update bid status in database*************/
// exports.updateDealsStatusInDb = async function (id, status, reason) {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       `UPDATE deals SET status = ${status},rejection_reason='${reason}' ,updated_at=now() WHERE id = ${id} `,
//       async (err, res) => {
//         if (err) {
//           console.log("Getting error while updating deal", err);
//           resolve("");
//         } else {
//           console.log("deal status changed");
//           resolve("done");
//         }
//       }
//     );
//   });
// };
/***************************get reported lising**********************************/
exports.getReportedListingFromDb = async function (userId, pageNo, pageSize) {
  const offset = (pageNo - 1) * pageSize;

  return new Promise((resolve, reject) => {
    // Fetch the specific page data
    pool.query(
      `
        SELECT create_listing.*, reports_list.*
        FROM create_listing
        JOIN reports_list ON create_listing.id = reports_list.listing_id
        WHERE create_listing.seller_id = ${userId}
        LIMIT ${pageSize}
        OFFSET ${offset};        
        `,
      async (err, listingResult) => {
        if (err) {
          console.log("Getting error while fetching listing", err);
          reject(err);
          return;
        }

        // Fetch the total count
        pool.query(
          `
            SELECT COUNT(*) AS total
            FROM create_listing
            JOIN reports_list ON create_listing.id = reports_list.listing_id
            WHERE create_listing.seller_id = ${userId};
            `,
          async (countErr, countResult) => {
            if (countErr) {
              console.log("Getting error while counting rows", countErr);
              reject(countErr);
              return;
            }

            const totalRows = countResult[0].total;
            const totalPages = Math.ceil(totalRows / pageSize);

            // Include the total pages in the result
            resolve({ data: listingResult, totalPages });
          }
        );
      }
    );
  });
};

/*********************Get listing and seller **********************/
exports.getCreatedListing = async function (pageNo, status, pageSize) {
  let whereClause;
  if (status) {
    whereClause = `WHERE create_listing.status = ${status}`;
  } else {
    whereClause = "";
  }
  console.log("pageNopageNopageNo", pageNo);
  // const offset = (pageNo - 1) * pageSize;
  const offset = (Number(pageNo) - 1) * Number(pageSize);
  console.log("pageNo:", pageNo);
  console.log("pageSize:", pageSize);
  console.log("offset:", offset);

  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT create_listing.*, users.name
      FROM create_listing
      JOIN users ON create_listing.seller_id = users.id
      ${whereClause}
      ORDER BY create_listing.id DESC
      LIMIT ${pageSize}
      OFFSET ${offset};
      `,
      async (err, listingResult) => {
        if (err) {
          console.log("Getting error while fetching listing", err);
          reject(err);
          return;
        }

        // Counting query
        pool.query(
          `
          SELECT COUNT(*) AS total
          FROM create_listing
          JOIN users ON create_listing.seller_id = users.id
          WHERE create_listing.status = 2;
          `,
          async (countErr, countResult) => {
            if (countErr) {
              console.log("Getting error while counting rows", countErr);
              reject(countErr);
              return;
            }

            const totalRows = countResult[0].total;
            const totalPages = Math.ceil(totalRows / pageSize);

            // Include the total pages in the result
            resolve({ data: listingResult, totalPages });
          }
        );
      }
    );
  });
};

/***********************Get Buyer Deals********************/
exports.getAdminBuyerDeals = async function (userId, pageNo, pageSize) {
  console.log("pageNopageNopageNo", pageNo);
  // const offset = (pageNo - 1) * pageSize;
  const offset = (Number(pageNo) - 1) * Number(pageSize);
  console.log("pageNo:", pageNo);
  console.log("pageSize:", pageSize);
  console.log("offset:", offset);

  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT deals.listing_id,deals.status,deals.selling_price,deals.buyer_id, create_listing.title,create_listing.description,create_listing.selling_reason,create_listing.asking_price,create_listing.listing_thumbnail
      FROM deals
      JOIN create_listing ON deals.listing_id = create_listing.id
      ORDER BY deals.created_at DESC
      LIMIT ${pageSize}
      OFFSET ${offset};
      `,
      async (err, listingResult) => {
        if (err) {
          console.log("Getting error while fetching listing", err);
          reject(err);
          return;
        }

        // Counting query
        pool.query(
          `
          SELECT COUNT(*) AS total
          FROM deals
          JOIN create_listing ON deals.listing_id = create_listing.id
          `,
          async (countErr, countResult) => {
            if (countErr) {
              console.log("Getting error while counting rows", countErr);
              reject(countErr);
              return;
            }

            const totalRows = countResult[0].total;
            const totalPages = Math.ceil(totalRows / pageSize);

            // Include the total pages in the result
            resolve({ data: listingResult, totalPages });
          }
        );
      }
    );
  });
};

// ****************reqest payment from buyer*********************

exports.sellerPayment = async function (bidId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `Select   * from payment_history where deal_id = ${bidId}`,
      async (err, row) => {
        if (err) {
          console.log("Getting error while inserting favourite listing", err);
          resolve("");
        } else {
          console.log("rows----->", row);
          if (row[0]) {
            pool.query(
              `Select * from payment_history WHERE deal_id = ${bidId}`,
              async (err, res) => {
                if (err) {
                  console.log(
                    "Getting error while inserting favourite listing",
                    err
                  );
                  resolve("");
                } else {
                  console.log("found deal id here");
                  resolve({ seller_link: res[0].seller_link });
                }
              }
            );
          } else {
            pool.query(
              `
              SELECT * 
              FROM deals
              JOIN create_listing ON deals.listing_id = create_listing.id
              JOIN users ON deals.buyer_id = users.id
              WHERE deals.id = ${bidId};
              `,
              async (err, res) => {
                if (err) {
                  console.log("Getting error while fetching listing", err);
                  reject(err);
                  return;
                }
                console.log("response from helper>>>>>>>>", res[0]);
                pool.query(
                  `
        SELECT * FROM users where id = ${res[0].seller_id};
       
        `,
                  async (err, seller) => {
                    if (err) {
                      console.log("Getting error while fetching listing", err);
                      reject(err);
                      return;
                    }
                    console.log("seller response from helper>>>>>>>>", seller);

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Basic " + process.env.Escrow_token);
                    console.log('token=-0=-==-9=9=909======', process.env.Escrow_token)
                    var raw = JSON.stringify({
                      parties: [
                        {
                          role: "broker",
                          customer: "me"
                        },
                        {
                          role: "buyer",
                          customer: `${res[0].email}`
                        },
                        {
                          role: "seller",
                          customer: `${seller[0].email}`
                        }
                      ],
                      currency: "usd",
                      description: "Bidding product",
                      items: [
                        {
                          title: `${res[0].title}`,
                          description: `${res[0].description}`,
                          type: "general_merchandise",
                          inspection_period: 864000,
                          quantity: 1,
                          extra_attributes: {
                            with_content: false
                          },
                          schedule: [
                            {
                              amount: `${res[0].selling_price}`,
                              payer_customer: `${res[0].email}`,
                              beneficiary_customer: `${seller[0].email}`
                            }
                          ]
                        },
                        {
                          type: "broker_fee",
                          schedule: [
                            {
                              amount: 0.1,
                              payer_customer: `${res[0].email}`,
                              beneficiary_customer: "me"
                            }
                          ]
                        }
                      ]
                    });
                    let requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: raw,
                      redirect: "follow"
                    };

                    fetch(
                      "https://api.escrow-sandbox.com/2017-09-01/transaction",
                      requestOptions
                    )
                      .then(response => {
                        if (response.status == 401 || response.status == 500) {
                          return response.error;
                        }
                      })

                      .then(result => {

                        result = JSON.parse(result);
                        let seller_link = "";
                        let buyer_link = "";

                        for (let role of result.parties) {
                          if (role.role && role.role === "buyer") {
                            console.log("in side", role.role);
                            buyer_link = role.next_step;
                          } else if (role.role && role.role === "seller") {
                            seller_link = role.next_step;
                          }
                        }

                        pool.query(
                          `INSERT INTO payment_history (user_id,deal_id,status,seller_link,buyer_link,transaction_id) VALUES (${seller[0]
                            .id},${bidId},'Pending','${seller_link}','${buyer_link}',${result.id})`,
                          async (err, res) => {
                            if (err) {
                              console.log(
                                "Getting error while inserting favourite listing",
                                err
                              );
                              resolve("");
                            } else {
                              console.log(
                                "favourite listing submitted sucessfully"
                              );
                              resolve({ seller_link: seller_link });
                            }
                          }
                        );

                      })
                      .catch(error => console.log("error", error));
                  }
                );
              }
            );
          }
        }
      }
    );
  });
};

exports.buyerPayment = async function (bidId) {
  return new Promise((resolve, reject) => {
    console.log("inside helper db", bidId);
    pool.query(
      `Select * from payment_history WHERE deal_id = ${bidId}`,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting favourite listing", err);
          resolve("");
        } else {
          console.log("found deal id mmmmmmmmmmm");
          resolve({ buyer_link: res[0].buyer_link });
        }
      }
    );
  });
};
exports.webhookstatus = async function (transaction_id, status_input) {
  return new Promise((resolve, reject) => {
    console.log("webhook status", bidId);
    pool.query(
      `UPDATE payment_history SET status = ${status_input} WHERE transaction_id = ${transaction_id} `,
      async (err, res) => {
        if (err) {
          console.log("Getting error while inserting favourite listing", err);
          resolve("");
        } else {
          console.log("found deal id mmmmmmmmmmm");
          resolve({ result: res[0] });
        }
      }
    );
  });
}