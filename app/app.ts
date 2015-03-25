/// <reference path='../typings/all.d.ts' />
/// <amd-dependency path="controllers/controllers">
/// <amd-dependency path="routes/routes">
/// <amd-dependency path="angular-route">
/// <amd-dependency path="angular-resource">
import angular = require('angular');
export var mngmodule = angular.module('app', [
    'controllers',
    'routes'
]);