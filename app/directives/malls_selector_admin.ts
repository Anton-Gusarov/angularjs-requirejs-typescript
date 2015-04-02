/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");

export var mallsAdmin: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            //transclude: true,
            scope: {
                'value': '='
            },
            templateUrl: 'views/malls_selector_admin.html',
            controller: 'MallsAdminCtrl'
        }
};