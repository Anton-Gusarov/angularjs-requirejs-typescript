/// <reference path='../typings/all_node.d.ts' />
var async = require('./../async');
var Sequental = async.Sequental;
describe('sequental', function () {
    "use strict";
    it('should pass', function (done) {
        var counter = '', tasks = ['1', '2', '3'].map(function (val) {
            var value = val;
            return function (cb) {
                setTimeout(function () {
                    counter += value;
                    cb();
                }, (5 - Number(value)) * 10);
            };
        });
        new Sequental(tasks, function () {
            counter.should.equal('123');
            done();
        });
    });
});
//# sourceMappingURL=spec.js.map