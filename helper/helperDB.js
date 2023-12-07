const pool = require('../dbConfig/dbConnect');


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
                        console.log(res);
                        resolve(res);
                    } else {
                        console.log('no data found');
                        resolve('');
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
                    console.log('Data saved successfully');
                    resolve('done');
                }
            }
        );
    });
}

/*********************************update token in database*************/
exports.updateTokenInDb = async function (token,userId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE users SET token = '${token}',updated_at=now() WHERE id = ${userId}`,
            async (err, res) => {
                if (err) {
                    console.log("Getting error while updating token", err);
                    resolve("");
                } else {
                    console.log('token saved sucessfully');
                    resolve('done');
                }
            }
        );
    });

}


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
                        console.log('no data found');
                        resolve('');
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
                    console.log('Old Otp deleted sucessfully')
                    resolve("Old Otp deleted")
                }
            }
        );
    }); 
}

/*******************insert new otp in db*****************/
exports.insertOtpInDb = async function (userId,otp) {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO user_otp (user_id, otp, created_at) VALUES (${userId}, ${otp}, now())`,
            async (err, res) => {
                if (err) {
                    console.log("Getting error while inserting OTP", err);
                    resolve("");
                } else {
                    console.log('Otp saved sucessfully')
                    resolve("otp saved");
                }
            }
        );
    }); 
}

/*******************verifying otp in db*****************/
exports.verifyOtp = async function (user,otp) {
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
                        console.log('OTP not matched');
                        resolve('');
                    }
                }
            }
        );
    });
};

exports.changePassword = async function (newPassword,token) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE users SET password = '${newPassword}' WHERE token='${token}'`,
            async (err, res) => {
                if (err) {
                    console.log("Getting error changing password", err);
                    resolve("");
                } else {
                    console.log('password update sucessfully');
                    resolve('done');
                }
            }
        );
    });

}



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
                        console.log(res);
                        resolve(res);
                    } else {
                        console.log('no data found');
                        resolve('');
                    }
                }
            }
        );
    });
};

 
/*********************Check user role**********************/
exports.userRoleCheck= async function (roleId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT * FROM roles WHERE id = ${roleId}`,
            async (err, res) => {
                if (err) {
                    console.log("Getting error while checking role", err);
                    resolve("");
                } else {
                    if (res.length > 0) {
                        console.log(res);
                        resolve(res[0].type);
                    } else {
                        console.log('no data found');
                        resolve('');
                    }
                }
            }
        );
    });
};

 