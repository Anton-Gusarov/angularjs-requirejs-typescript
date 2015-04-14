/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/sidebar.html" />

import angular = require('angular');

var template = require('text!../views/sidebar.html');

export var sidebar: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            transclude: true,
            template: template
        }
};