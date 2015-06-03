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
    channel.publish('auth', 'login.auth', new Buffer(JSON.stringify({
        login: login,
        password: password
    })));

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
        })
    .catch((e)=>{
            console.log(e);
        });


    resolver.promise.then((auth: loginExchange)=>{

        return channel.consume('token.auth', (msg)=>{
            var content = JSON.parse(msg.content.toString());
            channel.ack(msg);

            if (content.login && loginHash[content.login]) {
                    if (!content.err) {
                        loginHash[content.login](null, content.token);
                        delete loginHash[content.login];
                        return;
                    }
                loginHash[content.login](content.err);
                delete loginHash[content.login];
                return;
                }

            });
        });


    return resolver.promise;
};