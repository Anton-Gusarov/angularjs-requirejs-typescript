/// <reference path='typings/all.d.ts' />

import db = require('db');
import mysql = require('mysql');
import express = require('express');
import bodyParser = require('body-parser');
import _ = require('lodash');
import request = require('request');
import uuid = require('node-uuid');
import fs = require('fs');
import async = require('async');

var mysqlLocal = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database:  'clothes'
},
    mysqlHerokuUrl = 'mysql://b32d76e00ac63c:0f3c1af0@us-cdbr-iron-east-02.cleardb.net/heroku_999172673e027c4?reconnect=true',
    env = process.argv[process.argv.length - 1] === '--production' ? 'production' : 'development';

var connection = mysql.createPool(env === 'production' ? mysqlHerokuUrl : mysqlLocal);

connection.on('connection', function(conn) {
    console.log('connected as id ' + conn.threadId);
});

var api = new db.API(),
    server = express();

api.setConnection(connection);
server.use(express.static('app'));
server.use(bodyParser.json());
server.use(function(req, res, next) {
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
server.get('/api/items', (req: express.Request, res: express.Response)=>{
    var options: IItemsOptions = _.pick(req.query, ['length', 'type', 'gender', 'start', 'malls']);

    if (!(options.malls instanceof Array) && Number(options.malls)) {
        options.malls = [Number(options.malls)];
    }

    api.getItems((rows)=>{
        res.send(rows);
    }, options);
});

/**
 * Saves changes to items
 */
server.post('/api/items', (req: express.Request, res: express.Response)=>{
    var data = req.body;
    api.saveItems_Malls(data, ()=>{
        res.send({
            'Result': 'OK'
        });
    });
});


/**
 * Gets all mall from database
 */
server.get('/api/malls', (req: express.Request, res: express.Response)=>{
    var options = _.pick(req.query, ['length', 'type', 'gender', 'start']);

    api.getMalls((rows)=>{
        res.send(rows);
    }, options);
});

/**
 * Downloading images from remote
 */
interface IDownloadItem {
    url:string;
    to:string;
}

server.get('/api/get_images', (req: express.Request, res: express.Response)=>{
    var options = {
        length: 120,
        start: 0,
        type: 'coats'
    },
        imagesToDownload: IDownloadItem[] = [],
        downloadIterator: AsyncIterator<IDownloadItem> = (item: IDownloadItem, errorCallback: ErrorCallback)=>{
            console.log('Started ' + item.url);
            request(item.url).pipe(fs.createWriteStream(item.to)).on('close', errorCallback);
    };

    api.getItems((rows)=>{

        rows.forEach((item)=>{
            var filename = 'zara-' + uuid.v1() + '.jpg';

            imagesToDownload.push({
                url: item.image_remote,
                to: '/images/' + filename,
                id: item.id
            });

        });

        async.eachLimit(imagesToDownload, 10, downloadIterator, (err)=>{
            api.saturateTemp(imagesToDownload, ()=>{
                res.send(err || 'All done');
            });
        });

    }, options);


});

server.listen(8081);