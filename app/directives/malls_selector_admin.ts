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
            // Same controller for the two directives which do the same thing but appear differently.
            controller: 'controllers.malls-admin'
        }
};