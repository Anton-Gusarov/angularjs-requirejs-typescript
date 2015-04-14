/// <reference path='typings/all.d.ts' />
var db = require('db');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var request = require('request');
var uuid = require('node-uuid');
var fs = require('fs');
var async = require('async');
var mysqlLocal = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'clothes'
}, mysqlHerokuUrl = 'mysql://b32d76e00ac63c:0f3c1af0@us-cdbr-iron-east-02.cleardb.net/heroku_999172673e027c4?reconnect=true', env = process.argv[process.argv.length - 1] === '--production' ? 'production' : 'development';
var connection = mysql.createPool(env === 'production' ? mysqlHerokuUrl : mysqlLocal);
connection.on('connection', function (conn) {
    console.log('connected as id ' + conn.threadId);
});
var api = new db.API(), server = express();
api.setConnection(connection);
server.use(express.static('app'));
server.use(bodyParser.json());
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
/**
 * API methods
 */
/**
 * Gets a list of cloth items
 */
server.get('/api/items', function (req, res) {
    var options = _.pick(req.query, ['length', 'type', 'gender', 'start', 'malls']);
    if (!(options.malls instanceof Array) && Number(options.malls)) {
        options.malls = [Number(options.malls)];
    }
    api.getItems(function (rows) {
        res.send(rows);
    }, options);
});
/**
 * Saves changes to items
 */
server.post('/api/items', function (req, res) {
    var data = req.body;
    api.saveItems_Malls(data, function () {
        res.send({
            'Result': 'OK'
        });
    });
});
/**
 * Gets all mall from database
 */
server.get('/api/malls', function (req, res) {
    var options = _.pick(req.query, ['length', 'type', 'gender', 'start']);
    api.getMalls(function (rows) {
        res.send(rows);
    }, options);
});
server.get('/api/get_images', function (req, res) {
    var options = {
        length: 120,
        start: 0,
        type: 'coats'
    }, imagesToDownload = [], downloadIterator = function (item, errorCallback) {
        console.log('Started ' + item.url);
        request(item.url).pipe(fs.createWriteStream(item.to)).on('close', errorCallback);
    };
    api.getItems(function (rows) {
        rows.forEach(function (item) {
            var filename = 'zara-' + uuid.v1() + '.jpg';
            imagesToDownload.push({
                url: item.image_remote,
                to: '/images/' + filename,
                id: item.id
            });
        });
        async.eachLimit(imagesToDownload, 10, downloadIterator, function (err) {
            api.saturateTemp(imagesToDownload, function () {
                res.send(err || 'All done');
            });
        });
    }, options);
});
server.listen(8081);
//# sourceMappingURL=server.js.map