/// <reference path='../typings/all_node.d.ts' />

import async = require('./../async');

var Sequental = async.Sequental;

describe('sequental', ()=>{
    "use strict";

    it('should pass', (done)=>{

        var counter = '',
            tasks = ['1', '2', '3'].map((val)=>{
                var value = val;
                return (cb)=>{
                    setTimeout(()=>{
                        counter += value;
                        cb();
                    }, (5-Number(value))*10);
                }
            });

        new Sequental(tasks, ()=>{
            counter.should.equal('123');
            done();
        });
    })
});