/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/mongodb/mongodb.d.ts' />
/// <reference path='typings/mysql/mysql.d.ts' />
/// <reference path='typings/express/express.d.ts' />
/// <reference path='typings/express/express-middleware.d.ts' />


import mysql = require("mysql");
var data = require('zara_couts.json');
var mysqlLocal = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database:  'clothes'
},

connection = mysql.createPool(mysqlLocal);
connection.on('connection', function(conn) {
//    connection = conn;
    console.log('connected as id ' + conn.threadId);
});

