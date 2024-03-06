const mysql = require('mysql');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,                   
  host: `${process.env.HOST}`,                 
  user: `${process.env.DB_USER}`,              
  password: `${process.env.DB_PASSWORD}`,       
  database: `${process.env.DB_NAME}`,           
  port: process.env.DB_PORT ,
  timezone: 'utc'            
});

 module.exports = pool;
