/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/product.html" />

import angular = require('angular');

var template = require('text!../views/product.html');

export class ProductController {

    constructor (public $scope, public $element, public $attrs, $transclude) {



    }

    public showDetailed () {
        this.$scope.$emit('detailed:show');
    }

}

export var product: ng.IDirectiveFactory = ($compile)=>{
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                'item': '='
            },
            replace: true,
            template: template,
            controller: ProductController,
            link: (scope, iElement, iAttrs, controller)=>{
                scope.$on('detailed:show', ()=>{
                    var detailed = angular.element('<product-detailed></product-detailed>');
                    $compile(detailed.contents())(scope);
                    iElement.prepend(detailed);
                });
            }
        }
};