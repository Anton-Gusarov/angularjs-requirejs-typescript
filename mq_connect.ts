/// <reference path='typings/all_node.d.ts' />

var amqp = require('amqplib');

import Promise = require('bluebird');

export interface loginExchange {
    amqp: any;
    channel: any;
    tokenQueue: any;
    loginQueue: any;
}

var loginHash = {};
var channel, tokenQueue, loginQueue;

export function login(login, password, cb) {
    channel.publish('login.auth', {
        login: login,
        password: password
    });

    loginHash[login] = cb;
}

export function connect () {
    var resolver = Promise.defer<loginExchange>();

    amqp.connect('amqp://localhost')
        .then((conn)=> conn.createChannel())
        .then((ch)=> {channel = ch; return ch.assertExchange('auth', 'direct')})

        .then(()=>channel.assertQueue('token.auth', {durable: false}))
        .then((q)=>{tokenQueue = q; return channel.bindQueue('token.auth', 'auth', 'token.auth')})

        .then(()=>channel.assertQueue('login.auth', {durable: false}))
        .then((q)=>{loginQueue = q; return channel.bindQueue('login.auth', 'auth', 'login.auth')})

        .then(()=> {
            resolver.resolve(<loginExchange>{
                amqp: amqp,
                channel: channel,
                tokenQueue: tokenQueue,
                loginQueue: loginQueue
            })
        });

    resolver.promise.then((auth: loginExchange)=>{

        return channel.consume('token.auth', (msg: tokenMessage)=>{
            msg.ack();

            if (msg.login && loginHash[msg.login]) {
                    if (!msg.err) {
                        loginHash[msg.login](null, msg.token);
                        return;
                    }
                loginHash[msg.login](msg.err);
                delete loginHash[msg.login];
                return;
                }

            });
        })
        .catch();


    return resolver.promise;
};