/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");

export var sidebar: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            transclude: true,
            //scope: {
            //    'close': '&onClose'
            //},
            templateUrl: 'views/sidebar.html'
        }
};