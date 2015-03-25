/// <reference path='../typings/all.d.ts' />
/// <amd-dependency path="main/main">
/// <amd-dependency path="angular-route">
/// <amd-dependency path="angular-resource">
// Declare app level module which depends on views, and components
import angular = require('angular');
import main_ctrl = require('main/main');
export var mngmodule = angular.module('myApp', [
    'ngRoute',
    'myApp.main'
    //'myApp.view1',
    //'myApp.view2',
    //'myApp.version'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'});
    }]);