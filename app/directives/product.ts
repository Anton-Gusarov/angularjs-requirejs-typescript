/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/product.html" />

import angular = require('angular');

var template = require('text!../views/product.html');

export class ProductController {

    constructor (public $scope, public $element, public $attrs, $transclude) {

        $scope.$watch($scope.detailed, this.showDetailed.bind(this));

    }

    public showDetailed (newValue, oldValue) {
        if (newValue === oldValue) { return; }
        this.$scope.$emit('detailed:' + (newValue ? 'show' : 'hide'));
    }

}

export var product: ng.IDirectiveFactory = ($compile)=>{
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                'item': '=',
                'detailed': '@',
                'select': '&'
            },
            replace: true,
            template: template,
            controller: ProductController,
            link: (scope: any, iElement, iAttrs, controller)=>{
                var detailed = angular.element('<product-detailed></product-detailed>');
                scope
                    .$on('detailed:show', ()=>{
                        $compile(detailed)(scope);
                        iElement.prepend(detailed);
                    });
                scope.$on('detailed:hide', ()=>{
                        detailed.remove();
                    });
            }
        }
};