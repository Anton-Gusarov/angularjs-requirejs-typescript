/// <reference path="async.d.ts" />
var taskArray = [
    function (callback) {
        setTimeout(function () {
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            callback(null, 'two');
        }, 100);
    },
];
async.series(taskArray, function (err, results) {
    console.log(results[0].match(/o/));
});
async.parallel(taskArray, function (err, results) {
    console.log(results[0].match(/o/));
});
async.parallelLimit(taskArray, 3, function (err, results) {
    console.log(results[0].match(/o/));
});
var taskDict = {
    one: function (callback) {
        setTimeout(function () {
            callback(null, 1);
        }, 200);
    },
    two: function (callback) {
        setTimeout(function () {
            callback(null, 2);
        }, 100);
    }
};
async.series(taskDict, function (err, results) {
    console.log(results['one'].toFixed(1));
});
async.parallel(taskDict, function (err, results) {
    console.log(results['one'].toFixed(1));
});
async.parallelLimit(taskDict, 3, function (err, results) {
    console.log(results['one'].toFixed(1));
});
//# sourceMappingURL=async-explicit-tests.js.map