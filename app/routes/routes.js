/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/main.html" />
/// <amd-dependency path="text!../views/main_admin.html" />
define(["require", "exports", 'angular', "text!../views/main.html", "text!../views/main_admin.html"], function (require, exports, angular) {
    var mainTemplate = require('text!../views/main.html');
    var mainAdminTemplate = require('text!../views/main_admin.html');
    exports.routes = angular.module('routes', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        /**
         * Here two routes share the same controller
         * as two similar views have almost the same functionality
         * so it prevents from copy-pasting.
         */
        $routeProvider.when('/', {
            template: mainTemplate,
            controller: 'controllers.main',
            resolve: {
                admin: function () {
                    return false;
                }
            }
        }).when('/admin', {
            template: mainAdminTemplate,
            controller: 'controllers.main',
            resolve: {
                admin: function () {
                    return true;
                }
            }
        }).otherwise({ redirectTo: '/' });
    }]);
});
//# sourceMappingURL=routes.js.map