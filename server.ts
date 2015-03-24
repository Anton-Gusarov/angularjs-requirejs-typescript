/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/mongodb/mongodb.d.ts' />
/// <reference path='typings/mysql/mysql.d.ts' />
/// <reference path='typings/express/express.d.ts' />
/// <reference path='typings/express/express-middleware.d.ts' />


import mysql = require("mysql");
import fs = require("fs");
var data = require('zara_couts.json');
var mysqlLocal = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database:  'clothes'
},
connection/* = mysql.createPool(mysqlLocal);
connection.on('connection', function(conn) {
//    connection = conn;
    console.log('connected as id ' + conn.threadId);
})*/;

data.items.forEach((cloth, index)=>{
    cloth.price = cloth.price.replace(/\s?руб\.$/i, '');
    cloth.price = Number(cloth.price.replace(/\s/g, ''));
    cloth.title = cloth.title.toLocaleLowerCase();
});

fs.writeFileSync('zara_treat.json', JSON.stringify(data), {encoding:'utf8'});