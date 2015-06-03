/// <reference path='typings/all_node.d.ts' />

var amqp = require('amqplib');

import Promise = require('bluebird');
import jwt = require('jsonwebtoken');

var channel, tokenQueue, loginQueue;

function connect () {

    amqp.connect('amqp://localhost')
        .then((conn)=> conn.createChannel())
        .then((ch)=> {channel = ch; return ch.assertExchange('auth', 'direct')})

        .then(()=>channel.assertQueue('token.auth', {durable: false}))
        .then((q)=>{tokenQueue = q; return channel.bindQueue('token.auth', 'auth', 'token.auth')})

        .then(()=>channel.assertQueue('login.auth', {durable: false}))
        .then((q)=>{loginQueue = q; return channel.bindQueue('login.auth', 'auth', 'login.auth')})
        .then(()=>{

            channel.consume('login.auth', (msg: auth.loginMessage)=>{
                var content = JSON.parse(msg.content.toString());
                channel.ack(msg);
                if (content.login === 'a') {
                    var token = jwt.sign({
                        iss: 'a'
                    }, 'shhhhhhared-secret');
                    channel.publish('auth', 'token.auth', new Buffer(JSON.stringify({
                        token: token,
                        login: content.login
                    })));
                } else {
                    channel.publish('auth', 'token.auth', new Buffer(JSON.stringify({
                        ERROR: 'Incorrect',
                        code: 401,
                        login: content.login
                    })));
                }
            });

        })
        .catch((e)=>{
            console.error(e);
        });

    console.log('ok');

};

connect();