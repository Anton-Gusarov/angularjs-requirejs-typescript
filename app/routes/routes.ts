/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");
export var routes = angular.module("routes", ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
        .otherwise({redirectTo: '/'});
}]);