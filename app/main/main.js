/// <reference path='../../typings/all.d.ts' />
define(["require", "exports", "angular"], function (require, exports, angular) {
    var MainController = (function () {
        function MainController() {
        }
        return MainController;
    })();
    exports.MainController = MainController;
    angular.module('myApp.main', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main/main.html',
            controller: 'MainCtrl'
        });
    }]).controller('MainCtrl', [MainController]);
});
//# sourceMappingURL=main.js.map