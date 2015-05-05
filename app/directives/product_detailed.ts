/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/product_detailed.html" />

import angular = require('angular');

var template = require('text!../views/product_detailed.html');

export var productDetailed: ng.IDirectiveFactory = ($compile)=>{
        return {
            restrict: 'E',
            transclude: true,
            scope: false,
            template: template,
            replace: true
        }
};