/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
export class MainController {

    constructor () {}

}

angular.module('myApp.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', [MainController]);