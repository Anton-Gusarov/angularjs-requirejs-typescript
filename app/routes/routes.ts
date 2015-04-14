/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/main.html" />
/// <amd-dependency path="text!../views/main_admin.html" />

import angular = require('angular');

var mainTemplate = require('text!../views/main.html');
var mainAdminTemplate = require('text!../views/main_admin.html');

export var routes = angular.module('routes', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    /**
     * Here two routes share the same controller
     * as two similar views have almost the same functionality
     * so it prevents from copy-pasting.
     */
    $routeProvider.when('/', {
        template: mainTemplate,
        controller: 'controllers.main',
        resolve: {
            admin:()=>{return false}
        }
    })
        .when('/admin', {
            template: mainAdminTemplate,
            controller: 'controllers.main',
            resolve: {
                admin:()=>{return true}
            }
        })
        .otherwise({redirectTo: '/'});
}]);