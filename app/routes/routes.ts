/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");
export var routes = angular.module("routes", ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    /**
     * Here two routes share the same controller
     * as two similar views have almost the same functionality
     * so it prevents from copy-pasting.
     */
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'controllers.main',
        resolve: {
            admin:()=>{return false}
        }
    })
        .when('/admin', {
            templateUrl: 'views/main_admin.html',
            controller: 'controllers.main',
            resolve: {
                admin:()=>{return true}
            }
        })
        .otherwise({redirectTo: '/'});
}]);