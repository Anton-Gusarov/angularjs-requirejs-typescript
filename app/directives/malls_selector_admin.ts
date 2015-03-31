/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");

export var mallsAdmin: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            //transclude: true,
            //scope: {
            //    'close': '&onClose'
            //},
            templateUrl: 'views/malls_selector_admin.html',
            controller: 'MallsAdminCtrl'
        }
};