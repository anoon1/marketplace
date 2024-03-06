const { rejects } = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const path = require('path');
const helperDB = require('../helper/helperDB')
const helper = require('../helper/helper')
const secretKey = process.env.SECRETKEY;

/**************For hashing password***********************/
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

/****************Sign up user****************************/
module.exports.signUpUser = async (req, res) => {
    try {
        console.log('Requested data', req.body);

        const { name, email, password, confirmPass, interest } = req.body;
        const errors = {};

        // Validate email
        if (email !== '' && email !== null) {
            let isEmailValid = await helper.isEmailValid(email);
            if (!isEmailValid) {
                errors.email = '• Invalid email format';
            }
        } else {
            errors.email = '• Email is required';
        }

        // Validate other fields (e.g., name, password, interest)
        if (!name.trim()) {
            errors.name = '• Name is required';
        }        

        if (!password) {
            errors.password = '• Password is required';
        }

        if (!confirmPass) {
            errors.confirmPass = '• Confirm password is required';
        }

        if (password && confirmPass && password !== confirmPass) {
            errors.matchpassword = '• Password and confirm password not matched';
        }

        if (!interest) {
            errors.interest = '• Interest is required';
        }

        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                status: 400,
                errors: errors,
            });
        } else {
            // Check if user exists
            const checkUser = await helperDB.checkUserInDb(email);

            if (checkUser !== '') {
                errors.email = 'User already exists';
                return res.status(400).json({
                    status: 400,
                    errors: errors,
                });
            } else {
                // Insert user data if the user does not exist
                const hashedPassword = await hashPassword(password);
                let interestId = interest === 'buying' ? 1 : interest === 'selling' ? 2 : interest;
                const insertQuery = await helperDB.insertUser(name, email, hashedPassword, interestId);
                if (insertQuery) {
                    return res.status(200).json({
                        status: 200,
                        message: 'Sign up successful',
                    });
                } else {
                    errors.general = 'Internal Server Error';
                
                    return res.status(500).json({
                        status: 500,
                        errors: errors,
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error processing signup:', error);
        res.status(500).json({
            status: 500,
            message: 'Error processing signup',
        });
    }
};

/************************Sign in user********************************/
module.exports.signInUser = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const { email, password } = req.body;
        // Validate email
        const errors = {};

        // Validate email
        if (email !== '' && email !== null) {
            let isEmailValid = await helper.isEmailValid(email);
            if (!isEmailValid) {
                errors.email = '• Invalid email format';
            }
        } else {
            errors.email = '• Please enter a valid email';
        }

      if (!password) {
            errors.password = '• Password is required';
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                status: 400,
                errors: errors,
            });
        } else {
        const checkUserRegistered = await helperDB.checkUserInDb(email);
        console.log(checkUserRegistered)
        if (checkUserRegistered != '') {
            const storedHashedPassword = checkUserRegistered.password;
            const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
            if (passwordMatch) {
                console.log('User signed in successfully');
                let userId = checkUserRegistered.id;
                let roleId=checkUserRegistered.role_id;
                let userName=checkUserRegistered.name;
                let checkStep=checkUserRegistered.step_1;
                let checkRole = await helperDB.userRoleCheck(roleId)
                // Create JWT token with a 3-hour expiration
                const token = jwt.sign({ userId: userId }, `${secretKey}`, { expiresIn: '3h' });
                console.log('jwttoken', token)
                // Update the user table with the new token
                const updateTokenQuery = await helperDB.updateTokenInDb(token, userId);
                if (updateTokenQuery == '') {
                    console.log('Error updating token');
                    errors.general = 'Internal Server Error';
                
                    return res.status(500).json({
                        status: 500,
                        errors: errors,
                    });
                } else {
                    return res.status(200).json({
                        status: 200,
                        message: 'User signed in successfully',
                        data: {checkRole, token, userName ,checkStep},
                    });
                }
            } else {
                console.log('Invalid email or password');
                errors.general = 'Invalid email or password';
                
                    return res.status(500).json({
                        status: 500,
                        errors: errors,
                    });
            }
        
        
        } else {
            console.log('User does not exist');
            errors.general = 'User does not exist';
            return res.status(401).json({ status: 401, message: 'Invalid email or password',errors:errors });
        }
    }
    } catch (err) {
        console.log('Error in signInUser function', err);
        return res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
};

/***************************forgot password request send*************************/
module.exports.forgetPassword = async (req, res) => {
    try {
        console.log(req.body.email);
        const email = req.body.email;

        // Validate email
        if (email !== '' && email !== null) {
            let isEmailValid=await helper.isEmailValid(email)
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
        const checkUserRegistered = await helperDB.checkUserInDb(email);
        console.log(checkUserRegistered)
        if (checkUserRegistered != '') {
            console.log('user exists');
            const userId = checkUserRegistered.id;
            console.log(userId)
            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
            // Send email with OTP

            try {
                const checkOtpInDb = await helperDB.checkOtpInDb(userId);
                if (checkOtpInDb != '') {
                    console.log('user found');
                    await helperDB.deleteOldOtp(userId);
                    console.log('OTP deleted successfully');
                }

                let sendOtp = await sendEmail(email, otp);
                console.log('sendOtp', sendOtp);

                if (sendOtp) {
                    const insertOTPQuery = await helperDB.insertOtpInDb(userId, otp);

                    if (insertOTPQuery == '') {
                        console.log('Error inserting OTP:', insertErr);
                        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
                    }

                    return res.status(200).json({ status: 200, message: 'OTP sent successfully' });
                } else {
                    console.log('Error in sendOtp function');
                }
            } catch (error) {
                console.log('Error checking user id in OTP or sending OTP:', error);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        } else {
            console.log('Email not exist');
            return res.json({ status: 400, message: 'Please enter a registered email' });
        }


    } catch (err) {
        console.log('Error in forgetPassword function', err);
        return res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
};

/***********Function to send email with OTP using Nodemailer***********/
function sendEmail(email, otp) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: `${process.env.NODEMAILER_HOST}`,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: `${process.env.NODEMAILER_USER}`,
                pass: `${process.env.NODEMAILER_AUTH_PASSWORD}`,
            },
            tls: {
                // Add TLS options if needed
            }
        });

        const mailOptions = {
            from: `${process.env.EMAIL_FROM}`,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                resolve('');
            } else {
                console.log('Email sent:', info.response);
                resolve('sent');
            }
        });
    });
}

/*************************Verify otp sent to user*************************/
module.exports.verifyOtp = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const otp = req.body.otp;
        const user = req.body.userId;
        if (!otp) {
            console.log('empty otp');
            return res.status(400).json({
                status: 400,
                message: 'Please Enter OTP',
            });
        }
        const otpVerify = await helperDB.verifyOtp(user, otp)
        console.log('checkUser>>>>>>>', otpVerify);
        if (otpVerify.length > 0) {
            console.log('data found', otpVerify);
            let createdAt = moment(otpVerify.created_at);
            let currentTime = moment();
            console.log(createdAt);
            // Calculate the difference in minutes
            let timeDifference = currentTime.diff(createdAt, 'minutes');
            console.log('timeDifference', timeDifference);
            if (timeDifference > 5) {
                return res.status(400).json({
                    status: 400,
                    message: 'OTP expired',
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    message: 'OTP verified successfully',
                });
            }
        } else {
            return res.status(400).json({ status: 400, message: 'Otp not matched' });
        }
    } catch (err) {
        console.log('error in verify otp', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

/***********************Changing password in database***********************/
module.exports.changePassword = async (req, res) => {
    try {
        const email = req.body.email;
        const newPassword = req.body.password;

        // Validate email
        if (email !== '' && email !== null) {
            let isEmailValid=await helper.isEmailValid(email)
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
        // Validate new password
        if (!newPassword) {
            console.log('Empty new password');
            return res.status(400).json({
                status: 400,
                message: 'Please Enter New Password',
            });
        }

        // Check if the user is registered
        const checkUserRegistered = await helperDB.checkUserInDb(email);

        if (checkUserRegistered.length === 0) {
            console.log('User does not exist');
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

        const token = checkUserRegistered.token;
        
        // Check if the user's token is expired
        const checkToken = await helper.jwtExpTme(token);

        if (checkToken === 'expired') {
            console.log('The token is expired');
            return res.status(403).json({ message: 'Session Expired. Please Log In Again' });
        }

        // Hash the new password
        const newHashedPassword = await hashPassword(newPassword);

        // Update the password in the database
        await helperDB.changePassword(newHashedPassword, token);
        if(helperDB!=''){
        return res.json({ status: 200, message: 'Password Changed Successfully' });
        }else{
            console.log('error while changing password')
        }
    } catch (err) {
        console.log('Error while changing password', err);
        return res.status(500).json({
            status: 500,
            message: 'Error while changing password',
        });
    }
};
