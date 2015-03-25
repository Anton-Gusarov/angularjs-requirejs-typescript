/// <reference path='typings/all.d.ts' />

import db = require("db");
import mysql = require("mysql");
import express = require("express");
import _ = require("lodash");
var mysqlLocal = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database:  'clothes'
};
var connection = mysql.createPool(mysqlLocal);

connection.on('connection', function(conn) {
    console.log('connected as id ' + conn.threadId);
});

var api = new db.API(),
    server = express();

api.setConnection(connection);

server.get('/api/items', (req: express.Request, res: express.Response)=>{
    var options = _.pick(req.params, ['length', 'type', 'gender', 'start']);

    api.getItems((rows)=>{
        res.send(rows);
    }, options);
});
server.listen(3001);