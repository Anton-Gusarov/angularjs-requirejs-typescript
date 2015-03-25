define(["require", "exports", 'angular', "main/main", "angular-route", "angular-resource"], function (require, exports, angular) {
    exports.mngmodule = angular.module('myApp', [
        'ngRoute',
        'myApp.main'
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
});
//# sourceMappingURL=app.js.map