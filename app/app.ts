/// <reference path='../typings/all.d.ts' />
/// <amd-dependency path="controllers/controllers">
/// <amd-dependency path="routes/routes">
/// <amd-dependency path="services/services">
/// <amd-dependency path="directives/directives">
/// <amd-dependency path="ngInfiniteScroll">
/// <amd-dependency path="angular-route">
/// <amd-dependency path="angular-resource">
import angular = require('angular');
export var mngmodule = angular.module('app', [
    'controllers',
    'routes',
    'services',
    'directives'
]);