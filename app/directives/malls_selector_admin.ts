/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/malls_selector_admin.html" />

import angular = require('angular');

var template = require('text!../views/malls_selector_admin.html');

export var mallsAdmin: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            scope: {
                'value': '='
            },
            template: template,
            // Same controller for the two directives which do the same thing but appear differently.
            controller: 'controllers.malls-admin'
        }
};