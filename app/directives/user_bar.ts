/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/replaceable.html" />

import angular = require('angular');

var template = require('text!../views/replaceable.html');

export var userbar: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            transclude: true,
            template: template
        }
};