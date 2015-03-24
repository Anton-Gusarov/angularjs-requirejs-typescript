/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/mongodb/mongodb.d.ts' />
/// <reference path='typings/mysql/mysql.d.ts' />
/// <reference path='typings/express/express.d.ts' />
/// <reference path='typings/express/express-middleware.d.ts' />


import mysql = require("mysql");
import fs = require("fs");
var data = require('zara_treat.json');
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
var insert_prefix = 'INSERT INTO `Items` (title, link, price, image) VALUES',
    insert_body = [];
data.items.forEach((cloth, index)=>{
    insert_body.push(" ('" + cloth.title + "', "
    + connection.escape(cloth.link) + ", "
    + cloth.price + ", "
    + connection.escape(cloth.image) + ")");
});
//console.log(insert_prefix + insert_body);
connection.query(insert_prefix + insert_body.join(', '), (err)=>{if (err) console.log(err)});